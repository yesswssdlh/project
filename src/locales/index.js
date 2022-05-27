import Vue from 'vue';
import VueI18n from 'vue-i18n';

import zh from '@/locales/zh-CN.json';
import en from '@/locales/en-US.json';
import { localStorageGet } from '@/common/utils';

Vue.use(VueI18n);

const messages = {
  'en-US': en,
  'zh-CN': zh,
};

export default new VueI18n({
  locale: localStorageGet('lang') || 'zh-CN', // 设置地区
  messages, // 设置地区信息
});
