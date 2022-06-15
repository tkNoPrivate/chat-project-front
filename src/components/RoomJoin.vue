<template>
  <v-card width="1000" class="mx-auto">
    <v-card-title>
      <h1 class="display-1">部屋に参加</h1>
    </v-card-title>
    <DataTable
      :headers="headers"
      :items="roomSearchResults"
      itemKey="roomId"
      ref="roomSearchDataTable"
      :isCheckbox="true"
    />
    <v-card-actions>
      <v-btn class="info" @click="joinRoom">部屋に参加</v-btn>
    </v-card-actions>
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
  name: "RoomJoin",
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
      roomSearchResults: [],
      headers: [
        { text: "部屋ID", value: "roomId" },
        { text: "部屋名", value: "roomName" },
        { text: "作成ユーザー", value: "registeredUser" },
      ],
    };
  },
  created() {
    this.setRoomSearchResults();
  },
  methods: {
    async setRoomSearchResults() {
      // 部屋一覧データを取得、設定
      const resRoom = await axiosInstance.get("/rooms/nonjoin");
      this.roomSearchResults = resRoom.data;
    },
    async joinRoom() {
      const params = new FormData();
      params.append("userIdList[0]", this.loginUserId);
      this.$refs.roomSearchDataTable.selected.forEach((elm, i) => {
        params.append(`roomIdList[${i}]`, elm.roomId);
      });
      await axiosInstance.post("/joinroom/signup", params);

      // 正常終了メッセージの設定
      messageStore.setMessageInf(constant.INFO, [
        message.INFO_ROOM_JOIN_COMPLETE,
      ]);
      this.setRoomSearchResults();
      // ユーザーストアの更新
      userStore.setUserStore();
      this.$refs.roomSearchDataTable.selected = [];
    },
  },
};
</script>
