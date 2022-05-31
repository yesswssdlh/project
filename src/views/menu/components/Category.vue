<template>
  <div>
    <div> {{ category.name[lang] }}</div>
    <div>=====</div>
    <div
      v-for="food in foods"
      :key="food._id"
      :class="{ 'not-available' : !food.available}"
    >
      {{ food.name[lang] }}
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapState } from 'vuex';

export default {
  props: {
    category: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState({
      lang: (state) => state.lang.lang,
    }),
    foods() {
      return _.orderBy(this.category.foods, 'available', 'desc');
    },
  },
};
</script>

<style scoped>
    .not-available{
        opacity: 0.5;
    }
</style>
