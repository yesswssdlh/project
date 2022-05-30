<template>
  <div @click="goMenu">
    <!-- 餐馆名称 -->
    <div>
      <div class="res-name1">
        {{ restaurant.name[lang] }}
      </div>
      <div class="res-name2">
        {{ tags }}
      </div>
    </div>
    <div class="img-box">
      <!-- 大盘子 -->
      <div class="img-box1">
        <div>{{ foodName1 }}</div>
        <!-- 盘子图 -->
        <img
          class="dark-max"
          src="@/assets/dark-dish.png"
          alt=""
        >
        <!-- 菜图 -->
        <img
          class="small-img1"
          :src="foodImg1"
          alt=""
        >
      </div>
      <!-- 中盘子 -->
      <div class="img-box2">
        <div>{{ foodName2 }}</div>
        <img
          class="dark-middle"
          src="@/assets/dark-dish.png"
          alt=""
        >
        <!-- 菜图 -->
        <img
          class="small-img2"
          :src="foodImg2"
          alt=""
        >
      </div>
      <!-- 小盘子 -->
      <div class="img-box3">
        <div>{{ foodName3 }}</div>
        <img
          class="dark-min"
          src="@/assets/dark-dish.png"
          alt=""
        >
        <!-- 菜图 -->
        <img
          class="small-img3"
          :src="foodImg3"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapState } from 'vuex';
import i18n from '@/locales';
import { localStorageSet } from '@/common/utils';

export default {
  props: {
    restaurant: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      // 如果没有请求，默认菜名
      defaultItems: [
        {
          name: {
            'zh-CN': '红烧狮子头',
            'en-US': 'Stewed Lion Head Chinese Meatballs',
          },
          image: 'https://s3.amazonaws.com/ricepo-food/image-3r7hnd04jyk7nbn3.png',
        },
        {
          name: {
            'zh-CN': '三杯鸡',
            'en-US': 'Three Cups Chicken',
          },
          image: 'https://s3.amazonaws.com/ricepo-food/image-5b7jxyy2jvu95frk.png',
        },
        {
          name: {
            'zh-CN': '番茄鸡蛋面',
            'en-US': 'Tomato Egg Noodle',
          },
          image: 'https://s3.amazonaws.com/ricepo-food/image-o1bt3qsjz0fhei4.png',
        },
      ],
    };
  },
  computed: {
    ...mapState({
      lang: (state) => state.lang.lang,
    }),
    // restaurant的tags重构的数据
    tags() {
      let str = '';
      _.forEach(this.restaurant.tags, (item) => {
        str += `${i18n.t(`tags.${item}`)} `;
      });
      return str;
    },
    // restaurant的items的菜名重构的数据
    foodName1() {
      return _.get(
        this.restaurant,
        `items[0].name.${this.lang}`,
        this.defaultItems[0].name[this.lang],
      );
    },
    foodName2() {
      return _.get(
        this.restaurant,
        `items[1].name.${this.lang}`,
        this.defaultItems[1].name[this.lang],
      );
    },
    foodName3() {
      return _.get(
        this.restaurant,
        `items[2].name.${this.lang}`,
        this.defaultItems[2].name[this.lang],
      );
    },
    // restaurant的items的菜品图片重构的数据
    foodImg1() {
      return _.get(this.restaurant, 'items[0].image.url', this.defaultItems[0].image);
    },
    foodImg2() {
      return _.get(this.restaurant, 'items[1].image.url', this.defaultItems[1].image);
    },
    foodImg3() {
      return _.get(this.restaurant, 'items[2].image.url', this.defaultItems[2].image);
    },
  },
  methods: {
    goMenu() {
      // eslint-disable-next-line
      const cartId = this.restaurant._id;
      localStorageSet('id', cartId);
      localStorageSet('restaurant', this.restaurant);
      this.$router.push({
        name: 'menu',
        params: { id: cartId },
      });
    },
  },
};
</script>

<style scoped>
.res-name1 {
  font-size: 30px;
  cursor: pointer;
  font-family: PingFangSC-Regular;
  font-style: normal;
  font-weight: 600;
  font-stretch: normal;
  color: #202020;
  letter-spacing: normal;
}
.res-name2 {
  width: 220px;
  height: 24px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  font-stretch: normal;
  line-height: 1.5;
  color: #797979;
  letter-spacing: normal;
}
.img-box {
  position: relative;
  min-height: 285px;
  max-height: 435px;
  padding-bottom: 20px;
  margin-top: 10px;
  cursor: pointer;
}
.img-box1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  width: 163px;
  height: 163px;
}
.small-img {
  position: absolute;
  top: 13px;
  left: 11px;
}
.dark-max {
  width: 163px;
  height: 163px;
}
.img-box2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 130px;
  top: 130px;
  z-index: 1;
}
.dark-middle {
  width: 102.25px;
  height: 102.25px;
}
.img-box3 {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 30px;
  top: 170px;
  z-index: 1;
}
.dark-min {
  width: 81.5px;
  height: 81.5px;
}
/* 菜品位置 */
.small-img1 {
  width: 140px;
  height: 140px;
  position: absolute;
  left: 14px;
  top: 12px;
  z-index: 2;
}
.small-img2 {
  width: 80px;
  height: 80px;
  position: absolute;
  left: 11px;
  top: 20px;
  z-index: 2;
}
.small-img3 {
  width: 60px;
  height: 60px;
  position: absolute;
  left: 10px;
  top: 20px;
  z-index: 2;
}
</style>
