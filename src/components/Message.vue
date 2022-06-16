<template>
  <div>
    <v-alert
      class="message"
      v-for="val in messages"
      :key="val"
      border="top"
      :color="type === 'info' ? 'blue lighten-2' : 'red lighten-2'"
      dark
      dense
      dismissible
    >
      {{ val }}
    </v-alert>
  </div>
</template>

<script>
import messageStore from "../store/message-store";
export default {
  name: "Message",
  watch: {
    $route() {
      console.log(messageStore.state.isHoldMessage);
      messageStore.state.isHoldMessage
        ? messageStore.offMessageHoldFlg()
        : messageStore.clearMessageInf();
    },
  },
  computed: {
    type() {
      return messageStore.state.type;
    },
    messages() {
      return messageStore.state.messages;
    },
  },
};
</script>

<style scoped>
.message {
  position: relative;
  top: 50px;
}
</style>
