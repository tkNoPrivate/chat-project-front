<template>
  <div>
    <v-card width="400px" class="mx-auto mt-16">
      <v-card-title>
        <h1 class="display-1">{{ title }}</h1>
      </v-card-title>
      <v-form>
        <v-text-field
          v-model="roomForm.roomName"
          placeholder="部屋名を入力して下さい"
          label="部屋名"
          prepend-icon="mdi-forum"
        />
        <v-row justify="start"> <v-card-text>メンバー追加</v-card-text></v-row>
        <v-banner>
          <v-chip
            v-for="(user, index) in roomForm.selected"
            :key="index"
            close
            @click:close="remove(index)"
          >
            <v-avatar left>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{ user.userId }}
          </v-chip>
          <v-dialog
            v-model="isActiveUserSearchDialog"
            persistent
            width="500px"
            class="mx-auto mt-16"
          >
            <template #activator="{ on }">
              <v-icon slot="icon" left v-on="on">
                mdi-account-search
              </v-icon></template
            >
            <UserSearchDialog
              :parentSelected="roomForm.selected"
              @closeDialog="closeDialog"
            />
          </v-dialog>
        </v-banner>

        <v-card-actions>
          <v-btn class="info" @click="$emit('submit', roomForm)">登録</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import UserSearchDialog from "../components/UserSearchDialog";

export default {
  name: "RoomForm",
  components: {
    UserSearchDialog,
  },
  props: {
    title: { type: String, default: null, require: false },
    room: { type: Object, default: () => {}, require: false },
  },
  data() {
    return {
      isActiveUserSearchDialog: false,
      roomForm: {
        roomName: "",
        selected: [],
      },
    };
  },
  watch: {
    room: {
      handler() {
        if (this.room) {
          this.roomForm.roomName = this.room.roomName;
          this.roomForm.selected = this.room.joinUsers;
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    closeDialog(selected) {
      this.isActiveUserSearchDialog = false;
      this.roomForm.selected = selected;
    },
    remove(index) {
      this.roomForm.selected = this.roomForm.selected.filter(
        (val, i) => i !== index
      );
    },
    clearForm() {
      this.roomForm.roomName = "";
      this.roomForm.selected = [];
    },
  },
};
</script>
