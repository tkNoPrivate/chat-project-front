<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="items"
    :item-key="itemKey"
    :show-select="isCheckbox"
    :search="search"
  >
    <template v-slot:top>
      <v-text-field v-model="search" label="検索" class="mx-4"></v-text-field>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="$emit('edit', item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="$emit('delete', item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>
<script>
export default {
  name: "DataTable",
  props: {
    headers: { type: Array, default: () => [], require: false },
    items: { type: Array, default: () => [], require: false },
    itemKey: { type: String, default: "", require: false },
    parentSelected: { type: Array, default: () => [], require: false },
    isCheckbox: { type: Boolean, default: false, require: false },
  },
  data() {
    return {
      selected: [],
      search: "",
    };
  },
  watch: {
    parentSelected: {
      handler() {
        this.selected = this.parentSelected;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
