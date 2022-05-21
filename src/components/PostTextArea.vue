<template>
  <v-card width="500px" height="75px" class="mx-auto">
    <v-card-text>
      <v-form>
        <v-textarea rows="1" v-model="message" prepend-icon="mdi-comment">
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
