<template>
  <div
    v-if="isShow"
    class="loading-container"
  >
    <img
      src="@/assets/loading.gif"
      alt=""
      class="loading-image"
    >
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      isShow: (state) => state.loading.isShow,
    }),
  },
};
</script>

<style scoped lang="scss">
    .loading-container{
        width: 100vw;
        height: 100vh;
        position: fixed;
        left:0;
        top:0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(1,1,1,0.1);
    }

    .loading-image{
        width:100px;
        height:100px;
    }
</style>
