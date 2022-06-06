<template>
  <header>
    <v-app-bar color="blue" app dense>
      <v-app-bar-nav-icon
        v-if="isVmenu"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
      <v-icon @click="back" v-if="isBack">mdi-arrow-left</v-icon>
      <v-spacer></v-spacer>
      <v-text-field
        v-if="isSearchTextField"
        v-model="searchText"
        append-icon="mdi-magnify"
        @click:append="search"
        class="mt-7"
        dense
        solo
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-menu v-if="isVmenu">
        <template v-slot:activator="{ on }">
          <v-chip class="ma-2" active color="primary" label v-on="on">
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

export default {
  name: "Header",
  props: {
    userName: { type: String, default: "", require: false },
    rooms: { type: Array, default: () => [], require: false },
  },
  data() {
    return {
      isSearchTextField: false,
      isVmenu: false,
      isBack: false,
      drawer: false,
      searchText: "",
    };
  },
  watch: {
    $route() {
      this.isVmenu = this.changeShowVmenu();
      this.isSearchTextField = this.changeShowSearchTextField();
      this.isBack = this.changeShowBack();
      this.searchText = "";
    },
  },
  mounted() {
    this.isVmenu = this.changeShowVmenu();
    this.isSearchTextField = this.changeShowSearchTextField();
    this.isBack = this.changeShowBack();
    this.searchText = "";
  },
  methods: {
    back() {
      this.$router.push(this.$router.referrer.path);
    },
    changeShowVmenu() {
      const currentPath = this.$route.path;
      return (
        currentPath !== "/" &&
        currentPath !== "/login" &&
        currentPath !== "/account/signup"
      );
    },
    changeShowBack() {
      const currentPath = this.$route.path;
      return currentPath !== "/" && !/^\/post/.test(currentPath);
    },
    changeShowSearchTextField() {
      return /^\/post/.test(this.$route.path);
    },
    changeRoom(roomId) {
      this.$router.push(`/post/${roomId}`).catch(() => {});
    },
    async search() {
      this.$emit("searchPost", this.searchText);
    },
    async logout() {
      await axiosInstance.post("/logout");
      this.$router.push("/");
    },
  },
};
</script>


