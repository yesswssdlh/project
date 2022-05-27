<template>
  <div>
    <!-- 头部 -->
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
        @click.stop="openBox"
      >
    </div>
    <!-- 框体 -->
    <div
      v-show="boxFlag"
      ref="modall"
      class="container-box"
    >
      <!-- 历史订单 -->
      <div>
        <button
          v-if="OrderFlag"
          class="box-item box-item-history"
          @click="goOrder"
        >
          {{ $t("order.title") }}
        </button>
      </div>
      <!-- 登录 -->
      <div>
        <button
          v-if="loginFlag"
          class="box-item"
          @click="goLogin"
        >
          {{ $t("login.login") }}
        </button>
      </div>
      <!-- 中英切换 -->
      <div class="box-item-language">
        <!-- 中文 -->
        <div
          :class="['box-item-language-word',{smallBtn:btnFlag}]"
          @click="confirmLang('zh-CN')"
        >
          中
        </div>
        <!-- 英文 -->
        <div
          :class="['box-item-language-word',{smallBtn: !btnFlag}]"
          @click="confirmLang('en-US')"
        >
          En
        </div>
      </div>
      <!-- 登出 -->
      <div>
        <button
          v-if="quitFlag"
          class="box-item"
          @click="quitLogin"
        >
          {{ $t("logout") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { localStorageSet, localStorageGet } from '@/common/utils';
// vuex
import { mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      // 框体
      boxFlag: false,
      // 历史订单
      OrderFlag: false,
      // 登录
      loginFlag: false,
      // 登出
      quitFlag: false,
      // 控制中英文按钮颜色
      btnFlag: localStorageGet('lang') === 'zh-CN',
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  methods: {
    ...mapMutations(['quitUserLogin', 'changeLang']),
    // 控制中英文按钮颜色
    confirmLang(v) {
      if (v === 'zh-CN') {
        this.btnFlag = true;
      } else {
        this.btnFlag = false;
      }
      localStorageSet('lang', v);
      this.$i18n.locale = v;
      this.changeLang({ lang: v });
    },
    // 点击左侧tasty图标跳转到restaurant
    goRestaurant() {
      this.loginFlag = false;
      this.$router.push('/restaurant');
    },
    // 点击右边person图标，展不展示框体
    openBox() {
      this.boxFlag = true;
      // 全文档监听click事件
      document.addEventListener('click', this.addListener);
      // 如果用户登录了，根据在什么页面判断是否有历史订单和登出按钮
      // 登录之后再进入登录页面是进不去的，路由守卫跳转到其他页面
      // 如果用户信息不为空
      if (this.user !== '') {
        if (this.$route.path.split('/')[1] === 'order') {
          this.quitFlag = true;
          this.loginFlag = false;
        } else {
        // 不在订单页，有历史订单和登出，没有登录
          this.OrderFlag = true;
          this.quitFlag = true;
          this.loginFlag = false;
        }
      } else if (this.$route.path.split('/')[1] !== 'login') {
      // 没有登录，如果不在登录页面，有登录按钮
        this.loginFlag = true;
      }
    },
    // 被监听的事件，控制点击空白关闭框体
    addListener(e) {
      if (this.$refs.modall && !this.$refs.modall.contains(e.target)) {
        this.boxFlag = false;
      }
    },
    // 点击登录跳转到登录页面
    goLogin() {
      this.boxFlag = false;
      this.loginFlag = false;
      this.$router.push('/login');
    },
    // 点击登录跳转到订单页面
    goOrder() {
      if (this.user !== '') {
        this.OrderFlag = false;
        this.loginFlag = false;
        this.$router.push('/order');
      }
    },
    // 点击登出按钮，退出登录，清空全局管理和localstorage中的所有信息
    quitLogin() {
      this.OrderFlag = false;
      this.loginFlag = true;
      this.quitFlag = false;
      this.boxFlag = true;
      this.quitUserLogin('');
      localStorageSet('user', '');
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
.container-box{
    position: absolute;
    top: 105px;
    right: 65px;
    z-index: 1000;
    box-sizing: border-box;
    width: 220px;
    padding: 22px 25px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 8px 0 hsl(0deg 0% 68% / 50%);
}
.box-item{
  width: 170px;
    height: 40px;
    font-size: 14px;
    color: #797979;
    background-color: #fff;
    border: 1px solid #afafaf;
    border-radius: 25px;
    margin-top: 20px ;
}
.box-item-language{
  width: 170px;
  height: 40px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
// 切换中英文统一样式
.box-item-language-word{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #202020;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}
// 历史订单背景和字体样式
.box-item-history{
  color: #fff;
  background-color: #202020;
}
// 中英文按钮样式
.smallBtn{
  color: #fff;
  background-color: #202020;
}
</style>
