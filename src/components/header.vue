<template>
  <div class="container">
    <!-- header左边图片 -->
    <img
      src="@/assets/logo.png"
      alt=""
      class="img-left"
      @click="goRestaurant"
    >
    <!-- header右边图片 -->
    <img
      src="@/assets/profile-icon.png"
      alt=""
      class="img-right"
    >
  </div>
</template>

<script>
export default {
  methods: {
    // 点击跳转到restaurant
    goRestaurant() {
      this.$router.push('/restaurant');
    },
  },
};
</script >

<style  scoped lang="scss">
@import '@/styles/size.scss';
@import '@/styles/global.scss';

.container{
  // 左右两边排列
  @extend .containerBetween;
}
.img-left{
  width: $logo-height;
  height: $logo-height;
  cursor: pointer;
  margin:30px 0 0 30px;
}
.img-right{
  width: $logo-height;
  height: $logo-height;
  cursor: pointer;
  margin:30px 30px 0 0;
}
</style>
