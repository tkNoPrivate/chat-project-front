<template>
  <v-card width="1000" class="mx-auto">
    <v-card-title>
      <h1 class="display-1">作成部屋一覧</h1>
    </v-card-title>
    <DataTable
      :headers="headers"
      :items="createdRooms"
      itemKey="roomId"
      @edit="editRoom"
      @delete="deleteRoom"
    />
  </v-card>
</template>
<script>
import axiosInstance from "../axiosInterceptor";
import DataTable from "./DataTable";
import constant from "../common/constant";
import message from "../common/message";
import messageStore from "../store/message-store";
import userStore from "../store/user-store";

export default {
  name: "CreatedRoomList",
  components: {
    DataTable,
  },
  computed: {
    loginUserId() {
      return userStore.state.userId;
    },
  },
  data() {
    return {
      createdRooms: [],
      headers: [
        { text: "部屋ID", value: "roomId" },
        { text: "部屋名", value: "roomName" },
        { text: "操作", value: "actions" },
      ],
    };
  },
  created() {
    this.setCreatedRooms();
  },
  methods: {
    async setCreatedRooms() {
      const resRooms = await axiosInstance.get(`/rooms/${this.loginUserId}`);
      this.createdRooms = resRooms.data;
    },
    async editRoom(room) {
      this.$router.push(`/room/edit/${room.roomId}`);
    },
    async deleteRoom(room) {
      if (window.confirm(message.CONFIRM_DELETE_EXEC)) {
        const params = new FormData();
        params.append("roomId", room.roomId);
        params.append("roomName", room.roomName);
        await axiosInstance.post("/room/delete", params).finally(() => {
          // 画面の更新
          userStore.setUserStore();
          this.setCreatedRooms();
        });

        messageStore.setMessageInf(constant.INFO, [
          message.INFO_DELETE_COMPLETE,
        ]);
      }
    },
  },
};
</script>
