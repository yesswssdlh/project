export default {
  state: {
    // * modal是否显示
    isShow: false,
    // * 错误信息
    message: '',
  },
  mutations: {
    showModal(state, message) {
      state.isShow = true;
      state.message = message;
    },
    hideModal(state) {
      state.isShow = false;
      state.message = '';
    },
  },
  actions: {
  },
};
