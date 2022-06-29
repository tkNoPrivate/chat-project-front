<template>
  <header>
    <v-app-bar color="blue" app dense>
      <v-app-bar-nav-icon
        v-if="isVmenu"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
      <v-icon @click="back" v-if="isBack">mdi-arrow-left</v-icon>
      <v-menu v-if="isJoinUsers" open-on-hover>
        <template #activator="{ on }">
          <v-chip class="ma-2" label v-on="on"> 参加ユーザー </v-chip>
        </template>
        <v-list>
          <v-list-item v-for="val in joinUsers" :key="val.userId">
            <v-list-item-title>{{ val.userName }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <v-text-field
        v-if="isSearchTextField"
        v-model="searchText"
        append-icon="mdi-magnify"
        @click:append="search"
        class="mt-7 ml-16"
        style="width: 60px"
        dense
        solo
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-menu v-if="isVmenu" open-on-hover>
        <template #activator="{ on }">
          <v-chip class="ma-2" color="primary" label v-on="on">
            <v-icon left> mdi-account-circle </v-icon>
            {{ userName }}
          </v-chip>
        </template>
        <v-list>
          <v-list-item to="/account/edit">
            <v-list-item-title>アカウント編集</v-list-item-title>
          </v-list-item>
          <v-list-item to="/room/management">
            <v-list-item-title>部屋管理</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>ログアウト</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item v-for="val in rooms" :key="val.roomId">
            <v-list-item-title @click="changeRoom(val.roomId)">
              {{ val.roomName }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item to="/room/signup">
            <v-list-item-title
              ><v-icon>mdi-plus</v-icon>部屋作成</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>
import axiosInstance from "../axiosInterceptor";
import userStore from "../store/user-store";

export default {
  name: "Header",
  data() {
    return {
      isSearchTextField: false,
      isJoinUsers: false,
      isVmenu: false,
      isBack: false,
      drawer: false,
      searchText: "",
      joinUsers: [],
    };
  },
  computed: {
    userName() {
      return userStore.state.userName;
    },
    rooms() {
      return userStore.state.rooms;
    },
  },
  watch: {
    $route() {
      this.setDisplay();
    },
    rooms() {
      if (this.rooms.length) {
        this.joinUsers = this.rooms[0].joinUsers;
      }
    },
  },
  mounted() {
    this.setDisplay();
  },
  methods: {
    back() {
      this.$router.push(this.$router.referrer.path);
    },
    setDisplay() {
      const currentPath = this.$route.path;
      this.isVmenu =
        currentPath !== "/" &&
        currentPath !== "/login" &&
        currentPath !== "/account/signup";
      this.isBack = currentPath !== "/" && !/^\/post/.test(currentPath);
      this.isSearchTextField = /^\/post/.test(currentPath);
      this.isJoinUsers = /^\/post/.test(currentPath);
      this.searchText = "";
    },
    changeRoom(roomId) {
      this.$router.push(`/post/${roomId}`).catch(() => {});
      const room = this.rooms.find((r) => r.roomId === roomId);
      this.joinUsers = room.joinUsers;
    },
    async search() {
      this.$emit("searchPost", this.searchText);
    },
    async logout() {
      await axiosInstance.post("/logout");
      userStore.clearUserStore();
      this.$router.push("/");
    },
  },
};
</script>


