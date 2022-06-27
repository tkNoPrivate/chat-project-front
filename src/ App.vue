<template>
  <v-app>
    <Header @searchPost="setPost" />
    <Message v-show="!isShowDialog" />
    <router-view ref="post" />
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Message from "./components/Message";
import Constant from "./common/constant";
import messageStore from "./store/message-store";
import userStore from "./store/user-store";

export default {
  components: {
    Header,
    Message,
  },
  async mounted() {
    const currentPath = this.$route.path;
    if (
      currentPath !== "/" &&
      currentPath !== "/login" &&
      currentPath !== "/account/signup"
    ) {
      userStore.setUserStore();
    }
  },
  data() {
    return {
      searchText: "",
    };
  },
  computed: {
    isShowDialog() {
      return messageStore.state.isShowDialog;
    },
  },
  errorCaptured(err) {
    const status = err.response.status;
    if (status !== 404 && status !== 500) {
      const errorFields = err.response.data.fields
        ? err.response.data.fields
        : [];
      messageStore.setMessageInf(
        Constant.ERROR,
        err.response.data.messages,
        errorFields
      );
    }

    return false;
  },
  methods: {
    setPost(searchText) {
      this.$refs.post.searchPost(searchText);
    },
  },
};
</script>
