import Vue from 'vue';
import Vuex from 'vuex';
// 模块
import user from '@/store/user';
import loading from '@/store/loading';
import errorAlert from '@/store/errorAlert';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    loading,
    errorAlert,
  },
});
