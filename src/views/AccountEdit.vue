<template>
  <AccountForm :user="user" @submit="update" :isEdit="true" />
</template>

<script>
import axiosInstance from "../axiosInterceptor";
import Constant from "../common/constant";
import Message from "../common/message";
import AccountForm from "../components/AccountForm.vue";

export default {
  name: "UserEdit",
  components: {
    AccountForm,
  },
  data() {
    return {
      user: {
        userId: "",
        userName: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  async created() {
    const resUser = await axiosInstance.get("/user");
    const userInf = resUser.data;
    this.user.userId = userInf.userId;
    this.user.userName = userInf.userName;
    this.user.password = userInf.password;
    this.user.confirmPassword = userInf.confirmPassword;
  },
  methods: {
    async update(userForm) {
      const params = new FormData();
      params.append("userId", userForm.userId);
      params.append("userName", userForm.userName);
      params.append("password", userForm.password);
      params.append("confirmPassword", userForm.confirmPassword);
      await axiosInstance.post("/user/update", params);
      this.$emit("sendUserInf", userForm.userId, userForm.userName);
      this.$emit("throwMessage", Constant.INFO, [Message.INFO_UPDATE_COMPLETE]);
    },
  },
};
</script>
