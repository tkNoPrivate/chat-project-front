<template>
  <v-card width="1000" class="mx-auto">
    <v-card-title>
      <h1 class="display-1">参加部屋一覧</h1>
    </v-card-title>
    <DataTable
      :headers="headers"
      :items="joinRooms"
      itemKey="roomId"
      ref="JoinRoomsDataTable"
      :isCheckbox="true"
    />
    <v-card-actions>
      <v-btn class="info" @click="exitRoom">選択した部屋から脱退</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import axiosInstance from "../axiosInterceptor";
import DataTable from "./DataTable";
import Constant from "../common/constant";
import Message from "../common/message";

export default {
  name: "RoomDropOut",
  components: {
    DataTable,
  },
  props: {
    loginUserId: { type: String, default: "", require: true },
  },
  data() {
    return {
      joinRooms: [],
      headers: [
        { text: "部屋ID", value: "roomId" },
        { text: "部屋名", value: "roomName" },
        { text: "作成ユーザー", value: "registeredUser" },
      ],
    };
  },
  watch: {
    loginUserId: {
      handler() {
        this.setJoinRooms();
      },
      immediate: true,
    },
  },
  methods: {
    async setJoinRooms() {
      const resUser = await axiosInstance.get("/user");
      // 参加部屋データを設定
      this.joinRooms = resUser.data.rooms.filter(
        (elm) => elm.registeredUser !== this.loginUserId
      );
    },
    async exitRoom() {
      const params = new FormData();
      params.append("userIdList[0]", this.loginUserId);
      this.$refs.JoinRoomsDataTable.selected.forEach((elm, i) => {
        params.append(`roomIdList[${i}]`, elm.roomId);
      });
      await axiosInstance.post("/joinroom/delete", params);
      this.$emit("throwMessage", Constant.INFO, [
        Message.INFO_ROOM_DROPOUT_COMPLETE,
      ]);
      // データの更新
      this.setJoinRooms();
      this.$emit("updateRoom");
    },
  },
};
</script>
