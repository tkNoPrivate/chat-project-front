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
            this.subTitle = "Not Found";
            this.message = "ページが存在しません";
            break;
          case 500:
            this.subTitle = "Server Error";
            this.message = "システムエラー";
            break;
        }
      },
      immediate: true,
    },
  },
};
</script>
