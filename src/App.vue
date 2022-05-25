<template>
  <div>
    <!-- 统一头部样式 -->
    <headerView />
    <router-view />
    <!-- 全局错误提示信息 -->
    <errorAlert v-if="false" />
    <!-- 全局loading -->
    <loadingView />
  </div>
</template>

<script>
import headerView from '@/components/header/header.vue';
import errorAlert from '@/components/modal/errorAlert.vue';
import loadingView from '@/components/modal/loading.vue';

export default {
  name: 'App',
  components: {
    headerView,
    errorAlert,
    loadingView,
  },
};
</script>

<style>

</style>
