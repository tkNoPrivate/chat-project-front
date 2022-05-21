<template>
  <div>
    <v-card width="400px" class="mx-auto mt-16">
      <v-card-title>
        <h1 class="display-1">新規登録</h1>
      </v-card-title>
      <v-form>
        <v-text-field
          prepend-icon="mdi-card-account-details"
          v-model="userForm.userId"
          label="ユーザID"
          placeholder="ユーザーIDを入力してください。"
          :readonly="isEdit"
          :hint="isEdit ? 'ユーザーIDは変更出来ません' : undefined"
        />
        <v-text-field
          prepend-icon="mdi-account-box"
          v-model="userForm.userName"
          label="ユーザ名"
          placeholder="ユーザー名を入力してください"
        />
        <PasswordTextField
          :password.sync="userForm.password"
          placeholder="パスワードを半角英数字記号で入力して下さい"
          label="パスワード"
        />
        <PasswordTextField
          :password.sync="userForm.confirmPassword"
          placeholder="上と同じパスワードを入力して下さい"
          label="確認用パスワード"
        />
        <v-card-actions>
          <v-btn class="info" @click="$emit('submit', userForm)">登録</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import PasswordTextField from "../components/PasswordTextField";

export default {
  name: "Signup",
  components: {
    PasswordTextField,
  },
  props: {
    isEdit: { type: Boolean, default: false, require: true },
    user: { type: Object, default: () => {}, require: false },
  },
  data() {
    return {
      userForm: {
        userId: "",
        userName: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  watch: {
    user: {
      handler() {
        if (this.isEdit) {
          this.userForm.userId = this.user.userId;
          this.userForm.userName = this.user.userName;
          this.userForm.password = this.user.password;
          this.userForm.confirmPassword = this.user.confirmPassword;
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
