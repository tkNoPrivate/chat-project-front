<template>
  <AccountForm
    @submit="update"
    @delete="deleteAccount"
    :isEdit="true"
    :user="user"
    title="アカウント編集"
  />
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
  computed: {
    user() {
      return userStore.state;
    },
  },
  methods: {
    async update(userForm) {
      const params = new FormData();
      params.append("userId", userForm.userId);
      params.append("userName", userForm.userName);
      params.append("updDt", this.user.updDt);
      await axiosInstance.post("/user/update", params).catch((e) => {
        if (e.response.status === 409) {
          userStore.setUserStore();
        }
        throw e;
      });
      userStore.setUserStore();
      messageStore.setMessageInf(
        constant.INFO,
        [message.INFO_UPDATE_COMPLETE],
        []
      );
    },
    async deleteAccount() {
      if (window.confirm(message.CONFIRM_DELETE_EXEC)) {
        const params = new FormData();
        params.append("userId", this.user.userId);
        params.append("userName", this.user.userName);
        params.append("updDt", this.user.updDt);
        await axiosInstance.post("/user/delete", params).catch((e) => {
          if (e.response.status === 409) {
            userStore.setUserStore();
          }
          throw e;
        });
        await this.$router.push("/");
        messageStore.setMessageInf(constant.INFO, [
          message.INFO_DELETE_COMPLETE,
          [],
        ]);
      }
    },
  },
};
</script>
