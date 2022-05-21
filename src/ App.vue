<template>
  <v-app>
    <Header :userId="userId" :userName="userName" :rooms="rooms" @searchPost="setPost" />
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
    this.type = Constant.ERROR;
    this.messages = err.response.data.messages;  
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
    setPost(searchText){
      this.$refs.post.searchPost(searchText);
    }
  },
};
</script>
