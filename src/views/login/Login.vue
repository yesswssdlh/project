<template>
  <div class="container-login">
    <div class="container-box">
      <div class="container-input-box">
        <div class="container-word">
          用户名
        </div>
        <div>
          <input
            v-model="username"
            type="text"
            class="container-input"
          >
        </div>
      </div>
      <div class="container-input-box">
        <div class="container-word">
          密码
        </div>
        <div>
          <input
            v-model="password"
            type="password"
            class="container-input"
          >
        </div>
      </div>
      <div class="container-button">
        <div>
          <button
            class="normal-btn login-btn"
            @click="toRestaurant"
          >
            登录
          </button>
        </div>
        <div>
          <button class="normal-btn sign-up-btn">
            注册
          </button>
        </div>
      </div>
    </div>
    <LoginError />
  </div>
</template>

<script>
// import { userLogin } from '@/api/user';
import LoginError from '@/views/login/components/LoginError.vue';

export default {
  name: 'Login',
  components: {
    LoginError,
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    toRestaurant() {
      // 非空验证
      if (this.username && this.password) {
        // 用户名正则
        const regName = /^[a-zA-Z0-9_-]{4,16}$/;
        // 用户名正则检测
        if (regName.test(this.username)) {
          // 密码正则
          const regPsd = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
          // 密码正则检测
          if (regPsd.test(this.password)) {
            // 密码正确跳转到restaurant页面
            this.$router.push('/restaurant');
          } else {
            // 密码错误，清空密码
            this.password = '';
          }
        } else {
          // 用户名错误
          console.log(1);
        }
      }
    },
  },
};
</script>

<style scoped lang='scss'>

.container-login{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 150px);
  position : relative;
}
.container-box{
  width: 450px;
  height: 230px;
}
.container-input-box{
  display: flex;
  justify-content: space-between;
}
.container-word{
  font-family: PingFangSC-Regular;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  height: 37.5px;
  line-height: 37.5px;
}
.container-input{
  width: 300px;
  height: 37.5px;
  outline:none;
  border:none;
  border-bottom: 2px solid #202020;
  text-align:center;
}
.container-button{
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.normal-btn{
  height: 30px;
  padding: 5px 18px;
  font-size: 14px;
  color: #fff;
  background: #202020;
  border: 0;
  border-radius: 25px;
}
.login-btn{
  width: 300px;
  margin-top: 30px;
}
.sign-up-btn{
  width: 300px;
  margin-top: 30px;
}
</style>
