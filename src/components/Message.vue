<template>
  <!-- <v-container class="overflow-auto" fluid style="max-height:200px"> -->
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
    </v-alert></div>
  <!-- </v-container> -->
</template>

<script>
export default {
  name: "Message",
  props: {
    type: { type: String, require: true, default: "" },
    messages: { type: Array, require: true, default: () => [] },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.message {
  position: relative;
  top: 50px;
}
</style>
