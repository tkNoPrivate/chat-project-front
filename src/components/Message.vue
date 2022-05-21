<template>
  <div>
    <v-alert
      class="message"
      v-for="val in messages"
      :key="val"
      border="top"
      :color="type === 'info' ? 'blue lighten-2' : 'red lighten-2'"
      dark
    >
      {{ val }}
    </v-alert>
  </div>
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
