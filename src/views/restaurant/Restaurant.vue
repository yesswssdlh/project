<template>
  <div>
    <div>
      所有餐馆
    </div>
    <div>
      <restaurantItem />
    </div>
  </div>
</template>

<script>
import restaurantItem from '@/components/restaurant/restaurantItem.vue';

export default {
  name: 'Restaurant',
  components: {
    restaurantItem,
  },
};
</script>

<style scoped lang='scss'>

</style>
