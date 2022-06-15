<template>
  <v-card>
    <v-card-title class="display-1">メンバー選択</v-card-title>
    <DataTable
      :headers="headers"
      :items="users"
      itemKey="userId"
      ref="dataTable"
      :isCheckbox="true"
      :parentSelected="parentSelected"
    />

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="info" @click="close"> 閉じる </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axiosInstance from "../axiosInterceptor";
import DataTable from "./DataTable";
import userStore from "../store/user-store";

export default {
  name: "UserSearchDialog",
  components: {
    DataTable,
  },
  props: {
    parentSelected: { type: Array, default: () => [], require: false },
  },
  computed: {
    loginUserId() {
      return userStore.state.userId;
    },
  },
  data() {
    return {
      users: [],
      headers: [
        { text: "ユーザーID", value: "userId" },
        { text: "ユーザー名", value: "userName" },
      ],
    };
  },
  watch: {
    loginUserId: {
      async handler() {
        const users = await axiosInstance.get("/users/all");
        this.users = users.data.filter(
          (elm) => elm.userId !== this.loginUserId
        );
      },
      immediate: true,
    },
  },
  methods: {
    close() {
      this.$emit("closeDialog", this.$refs.dataTable.selected);
    },
  },
};
</script>
