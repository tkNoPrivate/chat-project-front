<template>
  <div>
    <v-card width="400px" class="mx-auto mt-16">
      <v-card-title>
        <h1 class="display-1">{{ title }}</h1>
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
        <div v-if="!isEdit">
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
        </div>
        <v-dialog
          v-model="isShowPasswordChangeDialog"
          v-if="isEdit"
          width="500px"
          class="mx-auto mt-16"
          persistent
        >
          <template #activator="{ on }">
            <v-btn text color="blue lighten-3" v-on="on" @click="openDialog"
              >パスワードを変更する</v-btn
            ></template
          >
          <v-card>
            <PasswordChangeDialog
              :userId="userForm.userId"
              @closeDialog="isShowPasswordChangeDialog = false"
            />
          </v-card>
        </v-dialog>
        <v-card-actions>
          <v-btn class="info" @click="$emit('submit', userForm)">登録</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import PasswordTextField from "../components/PasswordTextField";
import PasswordChangeDialog from "./PasswordChangeDialog";
import messageStore from "../store/message-store";
import userStore from "../store/user-store";

export default {
  name: "Signup",
  components: {
    PasswordTextField,
    PasswordChangeDialog,
  },
  props: {
    isEdit: { type: Boolean, default: false, require: true },
    title: { type: String, default: "", require: true },
  },
  computed: {
    loginUserId() {
      return userStore.state.userId;
    },
    loginUserName() {
      return userStore.state.userName;
    },
  },
  data() {
    return {
      userForm: {
        userId: "",
        userName: "",
        password: "",
        confirmPassword: "",
      },
      isShowPasswordChangeDialog: false,
    };
  },
  watch: {
    user: {
      handler() {
        if (this.isEdit) {
          this.userForm.userId = this.loginUserId;
          this.userForm.userName = this.loginUserName;
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    openDialog() {
      messageStore.clearMessageInf();
      messageStore.onDialogShowFlg();
    },
  },
};
</script>
