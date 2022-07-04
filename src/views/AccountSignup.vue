<template>
  <AccountForm @submit="signup" :isEdit="false" title="新規登録" />
</template>

<script>
import axiosInstance from "../axiosInterceptor";
import AccountForm from "../components/AccountForm.vue";
import constant from "../common/constant";
import message from "../common/message";
import messageStore from "../store/message-store";

export default {
  name: "AccountSignup",
  components: {
    AccountForm,
  },
  methods: {
    async signup(userForm) {
      const params = new URLSearchParams();
      params.append("userId", userForm.userId);
      params.append("userName", userForm.userName);
      params.append("password", userForm.password);
      params.append("confirmPassword", userForm.confirmPassword);
      await axiosInstance.post("/user/signup", params);
      await this.$router.push("/login");
      messageStore.setMessageInf(constant.INFO, [message.INFO_SIGNUP_COMPLETE]);
    },
  },
};
</script>
