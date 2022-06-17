import Vue from "vue";

const messageStore = Vue.observable({
  state: {
    type: "",
    messages: [],
    isShowDialog: false,
  },
  setMessageInf(type, messages) {
    this.state.type = type;
    this.state.messages = messages;
  },
  clearMessageInf() {
    this.state.type = "";
    this.state.messages = [];
  },
  onDialogShowFlg() {
    this.state.isShowDialog = true;
  },
  offDialogShowFlg() {
    this.state.isShowDialog = false;
  },
});

export default messageStore;
