<template>
  <v-app>
    <Header
      :userId="userId"
      :userName="userName"
      :rooms="rooms"
      @searchPost="setPost"
    />
    <Message :type="type" :messages="messages" />
    <router-view
      :loginUserId="userId"
      ref="post"
      @sendUserInf="setUserInf"
      @throwMessage="setMessage"
      @signupRoom="setRooms"
    />
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Message from "./components/Message";
import Constant from "./common/constant";
import axiosInstance from "./axiosInterceptor";

export default {
  components: {
    Header,
    Message,
  },
  watch: {
    $route() {
      this.type = "";
      this.messages = [];
    },
  },
  async mounted() {
    const currentPath = this.$route.path;
    if (
      currentPath !== "/" &&
      currentPath !== "/login" &&
      currentPath !== "/account/signup"
    ) {
      const resUser = await axiosInstance.get("/user");
      const userInf = resUser.data;
      this.setUserInf(userInf);
      this.setRooms(userInf.rooms);
    }
  },
  data() {
    return {
      userId: "",
      userName: "",
      rooms: [],
      type: "",
      messages: [],
      searchText: "",
    };
  },
  errorCaptured(err) {
    const status = err.response.status;
    if (status !== 404 && status !== 500) {
      this.type = Constant.ERROR;
      this.messages = err.response.data.messages;
    }

    return false;
  },
  methods: {
    setUserInf(userInf) {
      this.userId = userInf.userId;
      this.userName = userInf.userName;
    },
    setMessage(type, messages) {
      this.type = type;
      this.messages = messages;
    },
    setRooms(rooms) {
      this.rooms = rooms;
    },
    setPost(searchText) {
      this.$refs.post.searchPost(searchText);
    },
  },
};
</script>
