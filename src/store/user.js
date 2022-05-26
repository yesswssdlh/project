import { localStorageGet } from '@/common/utils';

export default {
  state: {
    user: localStorageGet('user') || {},
  },
  getters: {
  },
  mutations: {
    quitUserLogin(state, payload) {
      state.user = payload;
    },
  },
  actions: {
  },
  modules: {
  },
};
