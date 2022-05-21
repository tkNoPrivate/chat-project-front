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
import Constant from "../common/constant";
import PasswordTextField from "../components/PasswordTextField";

export default {
  name: "Login",
  components: {
    PasswordTextField,
  },
  props: {
    errorMessage: { type: Array, require: false, default: () => [] },
  },
  data() {
    return {
      userId: "",
      password: "",
    };
  },
  created() {
    const e = this.$route.query.error;
    if (e) {
      this.$emit("throwMessage", Constant.ERROR, e.response.data.messages);
    }
  },
  methods: {
    async submit() {
      const params = new FormData();
      params.append("userId", this.userId);
      params.append("password", this.password);

      await axiosInstance.post("/login", params);
      const resUser = await axiosInstance.get("/user");
      // レスポンス情報の設定
      const userInf = resUser.data;
      // App.vueにユーザー情報の設定
      this.$emit("sendUserInf", userInf);
      this.$emit("signupRoom", userInf.rooms);
      // 初期表示は1番目の部屋コードを設定
      if (userInf.rooms.length) {
        this.$router.push(`/post/${userInf.rooms[0].roomId}`);
      } else {
        this.$router.push("/room/management");
      }
    },
  },
};
</script>
