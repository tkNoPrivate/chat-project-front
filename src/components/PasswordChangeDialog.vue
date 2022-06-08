<template>
  <div>
    <Message :type="type" :messages="messages" class="overflow-auto" fluid />
    <v-card>
      <v-card-title>
        <h1 class="display-1">パスワード変更</h1>
      </v-card-title>
      <v-form>
        <PasswordTextField
          :password.sync="password"
          placeholder="現在のパスワードを入力して下さい"
          label="現在のパスワード"
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
  </div>
</template>
<script>
import PasswordTextField from "./PasswordTextField";
import axiosInstance from "../axiosInterceptor";
import CommonMessage from "../common/message";
import Constant from "../common/constant";
import Message from "./Message";

export default {
  name: "PasswordChangeDialog",
  components: {
    PasswordTextField,
    Message,
  },
  props: {
    userId: { type: String, default: "", require: true },
  },
  data() {
    return {
      password: "",
      newPassword: "",
      newConfirmPassword: "",
      type: "",
      messages: [],
    };
  },
  methods: {
    close() {
      Object.assign(this.$data, this.$options.data());
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
        this.type = Constant.ERROR;
        this.messages = e.response.data.messages;
        return;
      }
      this.type = Constant.INFO;
      this.messages = [CommonMessage.INFO_UPDATE_COMPLETE];
    },
  },
};
</script>
