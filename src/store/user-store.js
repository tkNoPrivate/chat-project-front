import Vue from "vue";
import axiosInstance from "../axiosInterceptor";

const userStore = Vue.observable({
  state: {
    userId: "",
    userName: "",
    insDt: "",
    updDt: "",
    rooms: [],
  },
  async setUserStore() {
    const resUser = await axiosInstance.get("/user");
    const userInf = resUser.data;
    this.state.userId = userInf.userId;
    this.state.userName = userInf.userName;
    this.state.insDt = userInf.insDt;
    this.state.updDt = userInf.updDt;
    this.state.rooms = userInf.rooms;
  },
  clearUserStore() {
    this.state.userId = "";
    this.state.userName = "";
    this.state.rooms = [];
  },
});

export default userStore;
