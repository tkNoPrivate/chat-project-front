<template>
  <AccountForm @submit="update" :isEdit="true" title="アカウント編集" />
</template>

<script>
import axiosInstance from "../axiosInterceptor";
import constant from "../common/constant";
import message from "../common/message";
import AccountForm from "../components/AccountForm.vue";
import messageStore from "../store/message-store";
import userStore from "../store/user-store";

export default {
  name: "UserEdit",
  components: {
    AccountForm,
  },
  methods: {
    async update(userForm) {
      const params = new FormData();
      params.append("userId", userForm.userId);
      params.append("userName", userForm.userName);
      await axiosInstance.post("/user/update", params);
      userStore.setUserStore();
      messageStore.setMessageInf(constant.INFO, [message.INFO_UPDATE_COMPLETE]);
    },
  },
};
</script>
