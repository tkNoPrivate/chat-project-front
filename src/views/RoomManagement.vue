<template>
  <div>
    <v-card width="1000" class="mx-auto mt-16">
      <v-tabs grow class="mt-16">
        <v-tab href="#room-join" @change="changeRoomJoin">部屋参加</v-tab>
        <v-tab href="#room-drop-out" @change="changeRoomDropOut"
          >部屋脱退</v-tab
        >
        <v-tab href="#created-room-list" @change="changeCreatedRoomList"
          >作成部屋</v-tab
        >
        <v-tab-item value="room-join"> <RoomJoin ref="roomJoin" /></v-tab-item>
        <v-tab-item value="room-drop-out">
          <RoomDropOut ref="roomDropOut"
        /></v-tab-item>

        <v-tab-item value="created-room-list">
          <CreatedRoomList ref="createdRoomList"
        /></v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>
<script>
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
  data() {
    return {};
  },
  methods: {
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
    changeCreatedRoomList() {
      const createdRoomListVue = this.$refs.createdRoomList;
      // 作成部屋タブが一度も表示されていない場合は実行不要
      if (createdRoomListVue) {
        createdRoomListVue.setCreatedRooms();
      }
    },
  },
};
</script>
