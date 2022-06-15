import Vue from "vue";
import axiosInstance from "../axiosInterceptor";

const userStore = Vue.observable({
  state: {
    userId: "",
    userName: "",
    rooms: [],
  },
  async setUserStore() {
    const resUser = await axiosInstance.get("/user");
    const userInf = resUser.data;
    this.state.userId = userInf.userId;
    this.state.userName = userInf.userName;
    this.state.rooms = userInf.rooms;
  },
  clearUserStore() {
    this.state.userId = "";
    this.state.userName = "";
    this.state.rooms = [];
  },
    setUserId(userId) {
      this.state.userId = userId;
    },
    setUserName(userName) {
      this.state.userName = userName;
    },
    setRooms(rooms) {
      this.state.rooms = rooms;
    },
});

export default userStore;
