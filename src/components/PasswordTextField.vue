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
    :error="isError"
  />
</template>
<script>
export default {
  name: "PasswordTextField",
  props: {
    password: { type: String, defult: "", require: true },
    label: { type: String, defult: "", require: true },
    placeholder: { type: String, defult: "", require: true },
    isError: { type: Boolean, default: false, require: true },
  },
  data() {
    return {
      showPassword: false,
    };
  },
};
</script>
