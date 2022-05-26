<template>
  <div>
    <div
      v-if="isShow"
      class="container"
    >
      <div class="container-box">
        <div class="container-box-word">
          {{ message }}
        </div>
        <div class="container-box-btn">
          <button @click="closeError">
            关闭
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState({
      isShow: (state) => state.errorAlert.isShow,
      message: (state) => state.errorAlert.message,
    }),
  },
  methods: {
    ...mapMutations(['hideModal']),
    closeError() {
      this.hideModal();
    },
  },

};
</script>

<style scoped>
.container {
  position: fixed;
  inset: 0px;
  background-color: rgba(255, 255, 255, 0.75);
  z-index: 90;
}
.container-box{
    position: absolute;
    inset: 50% auto auto 50%;
    border: 1px solid rgb(204, 204, 204);
    background: rgb(255, 255, 255);
    overflow: auto;
    border-radius: 4px;
    outline: none;
    padding: 20px;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    min-height: 100px;
    min-width: 400px;
}
</style>
