<template>
  <div>
    <v-card width="400px" class="mx-auto mt-16">
      <v-card-title>
        <h1 class="display-1">ログイン</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            prepend-icon="mdi-card-account-details"
            v-model="userId"
            label="ユーザID"
            placeholder="ユーザーIDを入力してください。"
          />
          <PasswordTextField
            label="パスワード"
            placeholder="パスワードを入力してください。"
            :password.sync="password"
          />
          <v-card-actions>
            <v-btn class="info" @click="submit">ログイン</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axiosInstance from "../axiosInterceptor";
import PasswordTextField from "../components/PasswordTextField";
import userStore from "../store/user-store";

export default {
  name: "Login",
  components: {
    PasswordTextField,
  },
  data() {
    return {
      userId: "",
      password: "",
    };
  },
  computed: {
    rooms() {
      return userStore.state.rooms;
    },
  },
  methods: {
    async submit() {
      const params = new FormData();
      params.append("userId", this.userId);
      params.append("password", this.password);

      await axiosInstance.post("/login", params);
      
      await userStore.setUserStore();
      
      // 初期表示は1番目の部屋コードを設定
      if (this.rooms.length) {
        this.$router.push(`/post/${this.rooms[0].roomId}`);
      } else {
        this.$router.push("/room/management");
      }
    },
  },
};
</script>
