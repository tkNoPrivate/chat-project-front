<template>
  <v-app>
    <v-card width="400px" height="200" class="mx-auto mt-16">
      <v-card-title>
        <h1 class="display-1">ようこそ</h1>
      </v-card-title>
      <v-card-text>
        <router-link to="/login">ログイン</router-link>
      </v-card-text>
      <v-card-text>
        <router-link to="/account/signup">新規登録</router-link>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "index",
  components: {},
};
</script>
