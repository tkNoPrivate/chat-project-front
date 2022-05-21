<template>
  <div>
    <RoomForm
      title="部屋新規登録"
      :loginUserId="loginUserId"
      ref="roomForm"
      @submit="submit"
    ></RoomForm>
  </div>
</template>

<script>
import axiosInstance from "../axiosInterceptor";
import Constant from "../common/constant";
import Message from "../common/message";
import RoomForm from "../components/RoomForm";

export default {
  name: "RoomSignup",
  components: {
    RoomForm,
  },
  props: {
    loginUserId: { type: String, default: null, require: false },
  },
  data() {
    return {};
  },
  methods: {
    async submit(roomForm) {
      const params = new FormData();
      params.append("roomName", roomForm.roomName);
      params.append("registeredUser", this.loginUserId);

      await axiosInstance.post("/room/signup", params);
      // 部屋を取得し、ヘッダーに再設定
      const resUser = await axiosInstance.get("/user");
      const rooms = resUser.data.rooms;
      this.$emit("signupRoom", rooms);
      //追加ユーザーが選択されている場合、追加処理APIを呼び出し
      if (roomForm.selected.length) {
        const params = new FormData();
        roomForm.selected.forEach((elm, i) =>
          params.append(`userIdList[${i}]`, elm.userId)
        );
        params.append("roomIdList[0]", rooms.slice(-1)[0].roomId);

        await axiosInstance.post("/joinroom/signup", params);
      }
      this.$refs.roomForm.clearForm();
      this.$emit("throwMessage", Constant.INFO, [Message.INFO_SIGNUP_COMPLETE]);
    },
  },
};
</script>
