export default {
  state: {
    // * loading是否显示
    isShow: false,
  },
  getters: {
  },
  mutations: {
    // 展开loading
    showLoading(state) {
      state.isShow = true;
    },
    // 关闭loading
    hideLoading(state) {
      state.isShow = false;
    },
  },
  actions: {
  },
};
