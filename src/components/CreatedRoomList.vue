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
import Constant from "../common/constant";
import Message from "../common/message";

export default {
  name: "CreatedRoomList",
  components: {
    DataTable,
  },
  props: {
    loginUserId: { type: String, default: null, require: false },
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
  watch: {
    loginUserId: {
      async handler() {
        this.setCreatedRooms();
      },
      immediate: true,
    },
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
      if (window.confirm(Message.CONFIRM_DELETE_EXEC)) {
        const params = new FormData();
        params.append("roomId", room.roomId);
        params.append("roomName", room.roomName);
        await axiosInstance.post("/room/delete", params);
        this.setCreatedRooms();
        this.$emit("throwMessage", Constant.INFO, [
          Message.INFO_DELETE_COMPLETE,
        ]);
      }
    },
  },
};
</script>
