<template>
  <div>
    <v-card width="1000" class="mx-auto mt-16">
      <v-tabs grow class="mt-16">
        <v-tab href="#room-join" @change="changeRoomJoin">部屋参加</v-tab>
        <v-tab href="#room-drop-out" @change="changeRoomDropOut"
          >部屋脱退</v-tab
        >
        <v-tab href="#created-room-list">作成部屋</v-tab>
        <v-tab-item value="room-join">
          <RoomJoin
            :loginUserId="loginUserId"
            @roomUpdate="setHeaderData"
            @throwMessage="throwMessage"
            ref="roomJoin"
        /></v-tab-item>
        <v-tab-item value="room-drop-out">
          <RoomDropOut
            :loginUserId="loginUserId"
            @roomUpdate="setHeaderData"
            @throwMessage="throwMessage"
            ref="roomDropOut"
        /></v-tab-item>

        <v-tab-item value="created-room-list">
          <CreatedRoomList
            :loginUserId="loginUserId"
            ref="createdRoomList"
            @throwMessage="throwMessage"
        /></v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>
<script>
import axiosInstance from "../axiosInterceptor";
import RoomDropOut from "../components/RoomDropOut";
import RoomJoin from "../components/RoomJoin";
import CreatedRoomList from "../components/CreatedRoomList";

export default {
  name: "JoinRoom",
  components: {
    RoomDropOut,
    RoomJoin,
    CreatedRoomList,
  },
  props: {
    loginUserId: { type: String, default: null, require: false },
  },
  data() {
    return {};
  },
  methods: {
    async setHeaderData() {
      const resUser = await axiosInstance.get("/user");
      // ドロワーメニューに部屋の再設定
      this.$emit("signupRoom", resUser.data.rooms);
    },
    changeRoomJoin() {
      const roomJoinVue = this.$refs.roomJoin;
      // 部屋参加タブが一度も表示されていない場合は実行不要
      if (roomJoinVue) {
        roomJoinVue.setRoomSearchResults();
      }
    },
    changeRoomDropOut() {
      const roomDropOutVue = this.$refs.roomDropOut;
      // 部屋脱退タブが一度も表示されていない場合は実行不要
      if (roomDropOutVue) {
        roomDropOutVue.setJoinRooms();
      }
    },
    throwMessage(type, messages) {
      this.$emit("throwMessage", type, messages);
    },
  },
};
</script>
