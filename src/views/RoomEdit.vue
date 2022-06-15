<template>
  <RoomForm title="部屋編集" :room="room" @submit="updateRoom" ref="roomForm" />
</template>
<script>
import axiosInstance from "../axiosInterceptor";
import constant from "../common/constant";
import message from "../common/message";
import RoomForm from "../components/RoomForm";
import messageStore from "../store/message-store";
import userStore from "../store/user-store";

export default {
  name: "RoomEdit",
  components: {
    RoomForm,
  },
  props: {
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
      // ユーザーストアの更新
      userStore.setUserStore();
      // 部屋参加ユーザーの更新
      this.updateJoinRoom(roomForm.selected);
      messageStore.setMessageInf(constant.INFO, [message.INFO_UPDATE_COMPLETE]);
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
  },
};
</script>
