import Vue from "vue";

const messageStore = Vue.observable({
  state: {
    type: "",
    messages: [],
    errorFields: [],
    isShowDialog: false,
  },
  setMessageInf(type, messages, errorFields) {
    this.state.type = type;
    this.state.messages = messages;
    this.state.errorFields = errorFields;
  },
  clearMessageInf() {
    this.state.type = "";
    this.state.messages = [];
    this.state.errorFields = [];
  },
  onDialogShowFlg() {
    this.state.isShowDialog = true;
  },
  offDialogShowFlg() {
    this.state.isShowDialog = false;
  },
});

export default messageStore;
