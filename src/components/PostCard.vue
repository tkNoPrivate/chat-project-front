<template>
  <div>
    <v-card width="500px" :class="cardStyle">
      <v-card-title>
        <v-icon large left> mdi-account </v-icon>
        <span class="text-h6 font-weight-light">{{ userName }}</span>
        <v-row justify="end">
          <v-card-subtitle>{{ updDt }}</v-card-subtitle>
          <v-menu>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="changeShowMessageEdit">
                <v-list-item-title>編集</v-list-item-title>
              </v-list-item>
              <v-list-item @click="deleteMessage">
                <v-list-item-title>削除</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
      </v-card-title>
      <v-card-text v-show="!isEdit">
        {{ contents }}
      </v-card-text>
      <PostTextArea
        v-show="isEdit"
        :editMessage="editMessage"
        @signupMessage="updateMessage"
      />
      <v-btn
        v-show="isEdit"
        text
        color="blue lighten-3"
        @click="changeShowMessageEdit"
      >
        キャンセル
      </v-btn>
      <v-card-actions>
        <slot name="cardActions" />
        <v-row justify="end" :class="likeIconStyle" width="50px">
          <v-icon @click="clickedLike"> mdi-hand-okay </v-icon>
          <span v-show="likeCount !== 0">{{ likeCount }}</span>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import PostTextArea from "./PostTextArea";
import Message from "../common/message";

export default {
  name: "PostCard",
  components: {
    PostTextArea,
  },
  props: {
    userName: { type: String, require: true, default: "" },
    contents: { type: String, require: true, default: "" },
    updDt: { type: String, require: true, default: "" },
    likes: { type: Array, require: false, default: () => [] },
    cardStyle: { type: String, require: true, default: "" },
    likeIconStyle: { type: String, require: true, default: "" },
  },
  data() {
    return {
      isEdit: false,
      editMessage: "",
      likeCount: 0,
    };
  },
  watch: {
    likes: {
      handler() {
        this.likeCount = Object.keys(this.likes).length;
      },
      immediate: true,
    },
  },
  methods: {
    changeShowMessageEdit() {
      this.isEdit = !this.isEdit;
      this.editMessage = this.isEdit ? this.contents : "";
    },
    clickedLike() {
      this.$emit("clickedLike");
    },
    updateMessage(message) {
      this.$emit("updateMessage", message);
    },
    deleteMessage() {
      if (window.confirm(Message.CONFIRM_DELETE_EXEC)) {
        this.$emit("deleteMessage", this.contents);
      }
    },
  },
};
</script>
