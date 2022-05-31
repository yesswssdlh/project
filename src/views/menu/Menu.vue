<template>
  <div>
    <!-- 餐馆名称 -->
    <div>
      <div class="res-name1">
        {{ restaurant.name[lang] }}
      </div>
      <div class="res-name2">
        {{ tags }}
      </div>
    </div>
    <Category
      v-for="category in categories"
      :key="category._id"
      :category="category"
    />
  </div>
</template>

<script>
import _ from 'lodash';
import i18n from '@/locales';
import { localStorageGet } from '@/common/utils';
import { getMenu } from '@/api/restaurant';
import { mapState } from 'vuex';
import Category from '@/views/menu/components/Category.vue';

export default {
  name: 'Menus',
  components: {
    Category,
  },
  data() {
    return {
      restaurant: localStorageGet('restaurant'),
      // 菜单的菜品分类数据
      categories: [],
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
    // 给食物分类
    // sortCategorie() {
    // },
  },
  created() {
    // created发送请求获取数据
    this.loadMenu();
  },
  methods: {
    async loadMenu() {
      try {
        // 发送请求获取菜单数据
        const result = await getMenu(localStorageGet('id'));
        const { categories, foods } = result;

        // ? 前端重构数据
        categories.forEach((category) => {
          const array = [];
          foods.forEach((food) => {
            // ? 此分类的食物
            // eslint-disable-next-line no-underscore-dangle
            if (food.category._id === category._id) {
              array.push(food);
            }
          });

          // eslint-disable-next-line no-param-reassign
          category.foods = array;
        });
        this.categories = categories;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
