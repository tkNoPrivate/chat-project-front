<template>
  <v-card>
    <v-card-title>
      <h1 class="display-1">パスワード変更</h1>
    </v-card-title>
    <v-form>
      <PasswordTextField
        :password.sync="password"
        placeholder="現在のパスワードを入力して下さい"
        label="パスワード"
      />
      <PasswordTextField
        :password.sync="newPassword"
        placeholder="新しいパスワードを半角英数字記号で入力して下さい"
        label="新しいパスワード"
      />
      <PasswordTextField
        :password.sync="newConfirmPassword"
        placeholder="上と同じパスワードを入力して下さい"
        label="確認用パスワード"
      />
      <v-card-actions>
        <v-btn class="info" @click="submit">更新</v-btn>
        <v-spacer></v-spacer>
        <v-btn text color="blue lighten-3" @click="close"> 閉じる </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
import PasswordTextField from "../components/PasswordTextField";
import axiosInstance from "../axiosInterceptor";
import Message from "../common/message";
import Constant from "../common/constant";

export default {
  name: "PasswordChangeDialog",
  components: {
    PasswordTextField,
  },
  props: {
    userId: { type: String, default: "", require: true },
  },
  data() {
    return {
      password: "",
      newPassword: "",
      newConfirmPassword: "",
    };
  },
  methods: {
    close() {
      this.$emit("clearMessage");
      this.$emit("closeDialog");
    },
    async submit() {
      const params = new FormData();
      params.append("userId", this.userId);
      params.append("password", this.password);
      params.append("newPassword", this.newPassword);
      params.append("newConfirmPassword", this.newConfirmPassword);
      try {
        await axiosInstance.post("/user/password/update", params);
      } catch (e) {
        this.$emit(
          "throwDialogMessage",
          Constant.ERROR,
          e.response.data.messages
        );
        return;
      }
      this.$emit("throwDialogMessage", Constant.INFO, [
        Message.INFO_UPDATE_COMPLETE,
      ]);
    },
  },
};
</script>
