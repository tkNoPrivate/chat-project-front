<template>
  <v-text-field
    :type="showPassword ? 'text' : 'password'"
    @click:append="showPassword = !showPassword"
    @input="$emit('update:password', $event)"
    prepend-icon="mdi-lock"
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :value="password"
    :label="label"
    :placeholder="placeholder"
  />
</template>
<script>
export default {
  name: "PasswordTextField",
  props: {
    password: { type: String, require: true},
    label: { type: String, require: true},
    placeholder: { type: String, require: true},
  },
  data() {
    return {
      showPassword: false,
    };
  },
};
</script>
