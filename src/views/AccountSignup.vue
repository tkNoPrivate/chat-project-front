<template>
  <AccountForm @submit="signup" :isEdit="false" title="新規登録" />
</template>

<script>
import axiosInstance from "../axiosInterceptor";
import AccountForm from "../components/AccountForm.vue";
import Constant from "../common/constant";
import Message from "../common/message";

export default {
  name: "AccountSignup",
  components: {
    AccountForm,
  },
  data() {
    return {};
  },
  methods: {
    async signup(userForm) {
      const params = new URLSearchParams();
      params.append("userId", userForm.userId);
      params.append("userName", userForm.userName);
      params.append("password", userForm.password);
      params.append("confirmPassword", userForm.confirmPassword);
      await axiosInstance.post("/user/signup", params);
      this.$router.push("/login");
      this.$emit("throwMessage", Constant.INFO, [Message.INFO_SIGNUP_COMPLETE]);
    },
  },
};
</script>
