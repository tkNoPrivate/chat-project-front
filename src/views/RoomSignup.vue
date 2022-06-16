<template>
  <div>
    <RoomForm title="部屋新規登録" ref="roomForm" @submit="submit" />
  </div>
</template>

<script>
import axiosInstance from "../axiosInterceptor";
import constant from "../common/constant";
import message from "../common/message";
import RoomForm from "../components/RoomForm";
import messageStore from "../store/message-store";
import userStore from "../store/user-store";

export default {
  name: "RoomSignup",
  components: {
    RoomForm,
  },
  computed: {
    loginUserId() {
      return userStore.state.userId;
    },
    rooms() {
      return userStore.state.rooms;
    },
  },
  methods: {
    async submit(roomForm) {
      const params = new FormData();
      params.append("roomName", roomForm.roomName);
      params.append("registeredUser", this.loginUserId);
      await axiosInstance.post("/room/signup", params);

      await userStore.setUserStore();
      
      //追加ユーザーが選択されている場合、追加処理APIを呼び出し
      if (roomForm.selected.length) {
        const params = new FormData();
        roomForm.selected.forEach((elm, i) =>
          params.append(`userIdList[${i}]`, elm.userId)
        );
        params.append("roomIdList[0]", this.rooms.slice(-1)[0].roomId);

        await axiosInstance.post("/joinroom/signup", params);
      }
      this.$refs.roomForm.clearForm();
      messageStore.setMessageInf(constant.INFO, [message.INFO_SIGNUP_COMPLETE]);
    },
  },
};
</script>
