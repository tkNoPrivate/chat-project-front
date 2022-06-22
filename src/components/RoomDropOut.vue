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
import constant from "../common/constant";
import message from "../common/message";
import messageStore from "../store/message-store";
import userStore from "../store/user-store";

export default {
  name: "RoomDropOut",
  components: {
    DataTable,
  },
  computed: {
    loginUserId() {
      return userStore.state.userId;
    },
    rooms() {
      return userStore.state.rooms;
    },
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
  created() {
    this.setJoinRooms();
  },
  methods: {
    setJoinRooms() {
      // 参加部屋データを設定
      this.joinRooms = this.rooms.filter(
        (elm) => elm.registeredUser !== this.loginUserId
      );
    },
    async exitRoom() {
      const params = new FormData();
      params.append("userIdList[0]", this.loginUserId);
      this.$refs.JoinRoomsDataTable.selected.forEach((elm, i) => {
        params.append(`roomIdList[${i}]`, elm.roomId);
      });
      await axiosInstance.post("/joinroom/delete", params).finally(async () => {
        // データの更新
        await userStore.setUserStore();
        await this.setJoinRooms();
        this.$refs.JoinRoomsDataTable.selected = [];
      });
      messageStore.setMessageInf(constant.INFO, [
        message.INFO_ROOM_DROPOUT_COMPLETE,
      ]);
    },
  },
};
</script>
