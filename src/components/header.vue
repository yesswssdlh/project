<template>
  <div class="container">
    <!-- header左边图片 -->
    <div>
      <img
        src="@/assets/logo.png"
        alt=""
      >
    </div>
    <!-- header右边图片 -->
    <div>
      <img
        src="@/assets/profile-icon.png"
        alt=""
      >
    </div>
  </div>
</template>

<script>
export default {

};
</script >

<style lang="scss" scoped>
.container{
    display: flex;
    // 两端对齐
    justify-content: space-between;
}
</style>
