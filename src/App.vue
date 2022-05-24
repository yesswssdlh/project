<template>
  <div>
    <!-- 统一头部样式 -->
    <headerView />
    <router-view />
  </div>
</template>

<script>
import headerView from '@/components/header.vue';

export default {
  name: 'App',
  components: {
    headerView,
  },
};
</script>

<style>

</style>
