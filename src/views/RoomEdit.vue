<template>
  <RoomForm
    title="部屋編集"
    :loginUserId="loginUserId"
    :room="room"
    @submit="updateRoom"
    ref="roomForm"
  ></RoomForm>
</template>
<script>
import axiosInstance from "../axiosInterceptor";
import Constant from "../common/constant";
import Message from "../common/message";
import RoomForm from "../components/RoomForm";

export default {
  name: "RoomEdit",
  components: {
    RoomForm,
  },
  props: {
    loginUserId: { type: String, default: "", require: true },
    roomId: { type: Number, default: null, require: true },
  },
  data() {
    return {
      room: {},
      joinUsers: [],
    };
  },
  watch: {
    roomId: {
      async handler() {
        const resRoom = await axiosInstance.get(`/room/${this.roomId}`);
        this.room = resRoom.data;
      },
      immediate: true,
    },
  },
  methods: {
    async updateRoom(roomForm) {
      const params = new FormData();
      params.append("roomId", this.roomId);
      params.append("roomName", roomForm.roomName);
      await axiosInstance.post("/room/update", params);
      // 部屋を取得し、ヘッダーに再設定
      this.setHeaderData();
      // 部屋参加ユーザーの更新
      this.updateJoinRoom(roomForm.selected);
      this.$emit("throwMessage", Constant.INFO, [Message.INFO_UPDATE_COMPLETE]);
    },
    async updateJoinRoom(selected) {
      // 参加部屋テーブルをクリア
      const params = new FormData();
      params.append("roomIdList[0]", this.roomId);
      await axiosInstance.post("/joinroom/delete/roomid", params);
      // ユーザーが選択されていれば登録処理を行う
      if (selected.length) {
        const params = new FormData();
        selected.forEach((elm, i) =>
          params.append(`userIdList[${i}]`, elm.userId)
        );
        params.append("roomIdList[0]", this.roomId);
        await axiosInstance.post("/joinroom/signup", params);
      }
    },
    async setHeaderData() {
      const resUser = await axiosInstance.get("/user");
      // ドロワーメニューに部屋の再設定
      this.$emit("signupRoom", resUser.data.rooms);
    },
  },
};
</script>
