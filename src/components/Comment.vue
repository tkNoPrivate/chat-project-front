<template>
  <div>
    <PostCard
      v-for="comment in comments"
      :key="comment.commentId"
      :userId="comment.commentUserId"
      :userName="comment.commentUserName"
      :contents="comment.comment"
      :updDt="comment.updDt"
      :likes="comment.commentLikes"
      :cardStyle="'mx-auto'"
      :likeIconStyle="'mr-7 mb-2'"
      :ref="`postCard${comment.commentId}`"
      v-show="isActiveComment"
      @clickedLike="clickedCommentLike(comment.commentId)"
      @updateMessage="
        updateComment($event, comment.commentId, `postCard${comment.commentId}`)
      "
      @deleteMessage="deleteComment($event, comment.commentId)"
    />
    <PostTextArea
      ref="postTextArea"
      @signupMessage="signupComment"
      v-show="isActivePostTextArea"
    />
  </div>
</template>
<script>
import PostCard from "../components/PostCard";
import PostTextArea from "../components/PostTextArea";
import axiosInstance from "../axiosInterceptor";
import userStore from "../store/user-store";

export default {
  name: "Comment",
  props: {
    comments: { type: Array, require: false, default: () => [] },
    postId: { type: Number, require: false, default: 0 },
  },
  computed: {
    loginUserId() {
      return userStore.state.userId;
    },
  },
  data() {
    return {
      isActiveComment: false,
      isActivePostTextArea: false,
    };
  },
  components: {
    PostCard,
    PostTextArea,
  },
  methods: {
    changeShowComment() {
      this.isActiveComment = !this.isActiveComment;
    },
    changeShowPostTextArea() {
      this.isActivePostTextArea = !this.isActivePostTextArea;
    },
    clickedCommentLike(commentId) {
      this.comments
        .find((elm) => elm.commentId === commentId)
        .commentLikes.find((elm) => elm.userId === this.loginUserId)
        ? this.commentLikeCountDown(commentId)
        : this.commentLikeCountUp(commentId);
    },
    async commentLikeCountUp(commentId) {
      const params = new FormData();
      params.append("userId", this.loginUserId);
      params.append("commentId", commentId);
      await axiosInstance.post("/commentlike/signup", params);
      this.$emit("commentInfUpd");
    },
    async commentLikeCountDown(commentId) {
      const params = new FormData();
      params.append("userId", this.loginUserId);
      params.append("commentId", commentId);
      await axiosInstance.post("/commentlike/delete", params);
      this.$emit("commentInfUpd");
    },
    async signupComment(message) {
      const params = new FormData();
      params.append("postId", this.postId);
      params.append("commentUserId", this.loginUserId);
      params.append("comment", message);
      await axiosInstance.post("/comment/signup", params);

      this.$emit("commentInfUpd");
      this.$refs.postTextArea.clearMessage();
      this.isActiveComment = true;
    },
    async updateComment(message, commentId, ref) {
      const params = new FormData();
      params.append("commentId", commentId);
      params.append("comment", message);
      await axiosInstance.post("/comment/update", params);

      this.$emit("commentInfUpd");
      this.$refs[ref][0].changeShowMessageEdit();
    },
    async deleteComment(contents, commentId) {
      const params = new FormData();
      params.append("commentId", commentId);
      params.append("comment", contents);
      await axiosInstance.post("/comment/delete", params);
      this.$emit("commentInfUpd");
    },
  },
};
</script>
