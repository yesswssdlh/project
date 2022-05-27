import { localStorageGet } from '@/common/utils';

export default {
  state: {
    lang: localStorageGet('lang') || 'zh-CN',
  },
  getters: {
  },
  mutations: {
    changeLang(state, { lang }) {
      state.lang = lang;
    },
  },
  actions: {
  },
};
