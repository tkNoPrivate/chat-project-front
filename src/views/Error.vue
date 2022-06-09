<template>
  <v-card width="600px" class="mx-auto mt-16">
    <v-card-title class="text-h2"> {{ status }}</v-card-title>
    <v-card-subtitle> {{ subTitle }}</v-card-subtitle>
    <v-card-text>{{ message }} </v-card-text>
    <v-card-actions>
      <v-btn text color="blue lighten-3" to="/">トップ</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import Message from "../common/message";

export default {
  name: "Error",
  props: {
    status: { type: Number, require: true, default: null },
  },
  data() {
    return {
      subTitle: "",
      message: "",
    };
  },
  watch: {
    status: {
      handler() {
        switch (this.status) {
          case 404:
            this.subTitle = Message.ERROR_NOT_FOUND_SUBTITLE;
            this.message = Message.ERROR_NOT_FOUND;
            break;
          case 500:
            this.subTitle = Message.ERROR_INTERNAL_SERVER_ERROR_SUBTITLE;
            this.message = Message.ERROR_INTERNAL_SERVER_ERROR;
            break;
        }
      },
      immediate: true,
    },
  },
};
</script>
