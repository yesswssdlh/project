<template>
  <div>
    <div>{{ $t('restaurant.allRestaurant') }}</div>
    <restaurantItem
      v-for="item in restaurants"
      :key="item._id"
      :restaurant="item"
    />
  </div>
</template>

<script>
import _ from 'lodash';
import moment from 'moment-timezone';
import getRestaurant from '@/api/restaurant';

// * 组件
import restaurantItem from '@/views/restaurant/components/restaurantItem.vue';

export default {
  components: {
    restaurantItem,
  },
  data() {
    return {
      restaurants: [],
    };
  },
  created() {
    this.loadRestaurant();
  },
  methods: {
    async loadRestaurant() {
      try {
        const result = await getRestaurant();

        this.restaurants = this.sortRestaurant(result);
        console.log('this.restaurants: ', this.restaurants);
      } catch (error) {
        console.log(error);
      }
    },
    sortRestaurant(restaurants) {
      const result = _.orderBy(restaurants, ['featured', 'zscore'], ['desc', 'desc']);

      const openArray = [];
      const closeArray = [];

      _.forEach(result, (item) => {
        if (this.checkClosed(item)) {
          openArray.push(item);
        } else {
          closeArray.push(item);
        }
      });
      return openArray.concat(closeArray);
    },
    // ? true 开门 false 关门
    checkClosed(restaurant) {
      // ? 如果商户手动关门
      const closed = _.get(restaurant, 'closed', null);
      if (closed !== null) {
        return false;
      }
      // ? 获取当前 时间
      const m = moment.tz('America/New_York');
      // ? 纽约当前时间分钟数
      const mins = m.hours() * 60 + m.minute();

      const dayOfWeek = m.isoWeekday() - 1;

      const start = _.get(restaurant, `hours[${dayOfWeek}].start`, 0);
      const end = _.get(restaurant, `hours[${dayOfWeek}].end`, 0);

      // ? 在时间区间内开门
      return mins >= start && mins <= end;
    },
  },
};
</script>

<style>

</style>
