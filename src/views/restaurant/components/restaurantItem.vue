<template>
  <div>
    {{ restaurant.name[lang] }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    restaurant: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState({
      lang: (state) => state.lang.lang,
    }),
  },
};
</script>

<style>

</style>
