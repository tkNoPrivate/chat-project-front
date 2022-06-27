<template>
  <v-card width="500px" height="75px" class="mx-auto">
    <v-card-text>
      <v-form>
        <v-textarea
          rows="1"
          maxlength="200"
          v-model="message"
          prepend-icon="mdi-comment"
          :error="isError"
        >
          <template v-slot:append-outer>
            <v-icon :disabled="!message" @click="signupMessage">
              mdi-send
            </v-icon>
          </template>
        </v-textarea>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "PostTextArea",
  props: {
    editMessage: { type: String, require: false, default: "" },
    isError: { type: Boolean, default: false, require: true },
  },
  data() {
    return {
      message: "",
    };
  },
  watch: {
    editMessage(val) {
      this.message = val;
    },
  },
  methods: {
    signupMessage() {
      this.$emit("signupMessage", this.message);
    },
    clearMessage() {
      this.message = "";
    },
  },
};
</script>
