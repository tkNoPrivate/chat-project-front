<template>
  <div>
    <v-container style="height: 600px" class="overflow-auto" ref="container">
      <v-row>
        <v-col cols="12" v-for="post in posts" :key="post.postId">
          <PostCard
            :userId="post.postUserId"
            :userName="post.postUserName"
            :contents="post.contents"
            :updDt="post.updDt"
            :likes="post.postLikes"
            :cardStyle="'mx-auto mt-16'"
            :likeIconStyle="'mr-7'"
            :ref="`postCard${post.postId}`"
            @clickedLike="clickedPostLike(post.postId)"
            @updateMessage="
              updatePost(
                $event,
                post.updDt,
                post.postId,
                `postCard${post.postId}`
              )
            "
            @deleteMessage="deletePost($event, post.updDt, post.postId)"
          >
            <template #cardActions>
              <v-btn
                text
                color="blue lighten-3"
                @click="changeShowComment(`comment${post.postId}`)"
              >
                コメント開閉
              </v-btn>
              <v-btn
                text
                color="blue lighten-3"
                @click="changeShowPostTextArea(`comment${post.postId}`)"
              >
                返信する
              </v-btn>
            </template>
          </PostCard>
          <Comment
            :ref="`comment${post.postId}`"
            :comments="post.comments"
            :postId="post.postId"
            @commentInfUpd="reconfigurePosts"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-footer fixed>
      <PostTextArea ref="postTextArea" @signupMessage="signupPost"
    /></v-footer>
  </div>
</template>
<script>
import PostCard from "../components/PostCard";
import Comment from "../components/Comment";
import PostTextArea from "../components/PostTextArea";
import axiosInstance from "../axiosInterceptor";
import userStore from "../store/user-store";

export default {
  name: "Post",
  props: {
    roomId: { type: Number, require: false, default: 0 },
  },
  data() {
    return {
      posts: [],
      isActivePostTextArea: false,
    };
  },
  computed: {
    loginUserId() {
      return userStore.state.userId;
    },
  },
  components: {
    PostCard,
    PostTextArea,
    Comment,
  },
  watch: {
    roomId: {
      async handler() {
        await this.reconfigurePosts();
        this.scrollToBottom();
      },
      immediate: true,
    },
  },
  methods: {
    changeShowComment(ref) {
      this.$refs[ref][0].changeShowComment();
    },
    changeShowPostTextArea(ref) {
      this.$refs[ref][0].changeShowPostTextArea();
    },
    async clickedPostLike(postId) {
      this.posts
        .find((elm) => elm.postId === postId)
        .postLikes.find((elm) => elm.userId === this.loginUserId)
        ? await this.postLikeCountDown(postId)
        : await this.postLikeCountUp(postId);
    },
    async searchPost(searchText) {
      const result = await axiosInstance.get("/post/search", {
        params: { roomId: this.roomId, searchText: searchText },
      });
      this.posts = result.data;
    },
    async signupPost(message) {
      const params = new FormData();
      params.append("postUserId", this.loginUserId);
      params.append("roomId", this.roomId);
      params.append("contents", message);
      await axiosInstance.post("/post/signup", params);
      await this.reconfigurePosts();
      this.$refs.postTextArea.clearMessage();
      this.scrollToBottom();
    },
    async updatePost(message, updDt, postId, ref) {
      const params = new FormData();
      params.append("postId", postId);
      params.append("contents", message);
      params.append("updDt", updDt);
      await axiosInstance.post("/post/update", params).catch(async (e) => {
        if (e.response.status === 409) {
          await this.reconfigurePosts();
          this.$refs[ref][0].changeShowMessageEdit();
        }
        throw e;
      });
      await this.reconfigurePosts();
      this.$refs[ref][0].changeShowMessageEdit();
      this.scrollToBottom();
    },
    async deletePost(contents, updDt, postId) {
      const params = new FormData();
      params.append("postId", postId);
      params.append("contents", contents);
      params.append("updDt", updDt);
      await axiosInstance.post("/post/delete", params).catch(async (e) => {
        if (e.response.status === 409) {
          await this.reconfigurePosts();
        }
        throw e;
      });
      await this.reconfigurePosts();
      this.scrollToBottom();
    },
    async postLikeCountUp(postId) {
      const params = new FormData();
      params.append("userId", this.loginUserId);
      params.append("postId", postId);
      await axiosInstance.post("/postlike/signup", params).finally(async () => {
        await this.reconfigurePosts();
      });
    },
    async postLikeCountDown(postId) {
      const params = new FormData();
      params.append("userId", this.loginUserId);
      params.append("postId", postId);
      await axiosInstance.post("/postlike/delete", params).finally(() => {
        this.reconfigurePosts();
      });
    },
    async reconfigurePosts() {
      const resPosts = await axiosInstance.get(`/posts/${this.roomId}`);
      this.posts = resPosts.data;
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.container;
        container.scrollTop = container.scrollHeight - container.clientHeight;
      });
    },
  },
};
</script>

