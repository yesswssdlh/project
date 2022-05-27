<template>
  <div class="res-container">
    <!-- 所有餐馆 -->
    <div class="res-left">
      <div class="res-word">
        {{ $t("restaurant.allRestaurant") }}
      </div>
    </div>
    <!-- 餐馆名称 -->
    <div>
      <restaurantItem
        v-for="item in restaurants"
        :key="item._id"
        :restaurant="item"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import moment from 'moment-timezone';
import getRestaurant from '@/api/restaurant';
import { mapMutations } from 'vuex';

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
    ...mapMutations(['showModal']),
    // 获取排序之后的餐馆名称数据
    async loadRestaurant() {
      try {
        // 发送请求获取餐馆名称数据
        const result = await getRestaurant();
        // 将餐馆名称数据排序
        this.restaurants = this.sortRestaurant(result);
      } catch (error) {
        console.log(error);
        this.showModal(error.message);
      }
    },
    // 排序方法
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

<style scoped>
.res-container{
  display: flex;
}
.res-left{
  position: relative;
  width: 30%;
  height: auto;
  margin-top: 30px;
  margin-left: 30px;
  line-height: 1;
  word-break: break-all;
  word-wrap: break-word;
  width: 300px;
}
.res-word {
  font-size: 50px;
  font-family: PingFangSC-Semibold;
  font-style: normal;
  font-weight: 600;
  font-stretch: normal;
  letter-spacing: normal;

}
</style>
