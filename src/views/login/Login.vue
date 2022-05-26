<template>
  <div>
    <div class="container-login">
      <!-- 登录框 -->
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
            <button
              class="normal-btn sign-up-btn"
              @click.stop="openRegist"
            >
              注册
            </button>
          </div>
        </div>
      </div>
      <!-- 注册框 -->
      <div
        v-if="registFlag"
        class="regist"
      >
        <div
          ref="modal"
          class="regist-box"
        >
          <div class="regist-input">
            <div class="regist-word">
              用户名
            </div><div>
              <input
                v-model="registUsername"
                type="text"
                class="regist-input-item"
              >
            </div>
          </div>
          <div class="regist-input">
            <div class="regist-word">
              密码
            </div><div>
              <input
                v-model="registPassword"
                type="password"
                class="regist-input-item"
              >
            </div>
          </div>
          <div class="regist-input">
            <div class="regist-word">
              确认
            </div><div>
              <input
                v-model="confirmPassword"
                type="password"
                class="regist-input-item"
              >
            </div>
          </div>
          <div>
            <button
              class="regist-btn"
              @click="registBtn"
            >
              注册
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userRegister, userLogin } from '@/api/user';
import encode from '@/common/crypto';
import { mapMutations } from 'vuex';
import { localStorageSet } from '@/common/utils';
// import CustomError from '@/common/error';

export default {
  name: 'Login',
  data() {
    return {
      // 登录-用户名
      username: '',
      // 登录-密码
      password: '',
      // 控制是否展示注册框
      registFlag: false,
      // 注册-用户名
      registUsername: '',
      // 注册-密码
      registPassword: '',
      // 注册-确认密码
      confirmPassword: '',
    };
  },
  methods: {
    ...mapMutations(['showLoading', 'hideLoading', 'showModal', 'quitUserLogin']),
    // 登录
    async toRestaurant() {
      // 非空验证
      if (this.username && this.password) {
        // 用户名检测
        if (this.verifyUsername(this.username)) {
          // 密码检测
          if (this.verifyPassword(this.password)) {
            // 登录请求
            await userLogin({
              username: encode(this.username),
              password: encode(this.password),
            });
            // 用户信息存入localStorage
            localStorageSet('user', {
              username: encode(this.username),
              password: encode(this.password),
            });
            // 用户信息存入vuex的user中
            this.quitUserLogin({
              username: encode(this.username),
              password: encode(this.password),
            });
            // 密码正确跳转到restaurant页面
            this.$router.push('/restaurant');
          } else {
            // 密码错误，清空密码
            this.password = '';
            this.showModal('输入的密码不符合要求，至少6位，至少1个大写字母，1个小写字母，1个数字，1个特殊符号。');
          }
        } else {
          // 用户名错误
          this.showModal('请输入正确的用户名，4到16位，字母，数字，下划线，减号。');
        }
      } else {
        this.showModal('请输入正确的用户名，4到16位，字母，数字，下划线，减号。');
      }
    },
    // 点击打开注册框
    openRegist() {
      this.registFlag = true;
      // 全文档监听click事件
      document.addEventListener('click', this.addListener);
    },
    // 被监听的事件，控制点击空白关闭框体
    addListener(e) {
      if (this.$refs.modal && !this.$refs.modal.contains(e.target)) {
        this.registFlag = false;
      }
    },
    // 注册框-注册方法
    async registBtn() {
      if (this.registUsername && this.registPassword && this.confirmPassword) {
        // 用户名检测
        if (this.verifyUsername(this.registUsername)) {
          // 密码检测
          if (this.verifyPassword(this.registPassword)) {
            // 密码正确，验证两次输入是否相等
            if (this.registPassword === this.confirmPassword) {
              try {
                // 打开loading
                this.showLoading();
                // 发送用户注册请求
                await userRegister({
                  username: encode(this.registUsername),
                  password: encode(this.registPassword),
                });
                // 关闭注册框
                this.registFlag = false;
                // 注册成功提示信息
                this.showModal('注册成功。');
              } catch (error) {
                console.log(error);
                this.showModal(error.message);
              } finally {
                // 关闭loading
                this.hideLoading();
              }
            } else {
              // 两次输入不等
              this.confirmPassword = '';
              this.showModal('两次输入的密码不同，请重新输入。');
            }
          } else {
            // 密码错误，清空密码
            this.registPassword = '';
            this.showModal('请输入正确的密码，密码要求为至少6位，至少1个大写字母，1个小写字母，1个数字，1个特殊符号。');
          }
        } else {
          // 用户名错误
          this.showModal('请输入正确的用户名，4到16位，字母，数字，下划线，减号。');
        }
      } else {
        this.showModal('请输入正确的用户名，4到16位，字母，数字，下划线，减号。');
      }
    },
    // 验证用户名
    verifyUsername(username) {
      const regName = /^[a-zA-Z0-9_-]{4,16}$/;
      if (regName.test(username)) {
        return true;
      }
      return false;
    },
    // 验证密码
    verifyPassword(password) {
      const regPsd = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
      if (regPsd.test(password)) {
        return true;
      }
      return false;
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
.regist{
  position: fixed;
  inset: 0px;
  background-color: rgba(255, 255, 255, 0.75);
  z-index: 10;
}
.regist-box{
  width: 600px;
  height: 600px;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.regist-input{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 404px;
  height: 41px;
  margin-top: 50px;
}
.regist-word{
  font-family: PingFangSC-Regular;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
}
.regist-input-item{
  width: 300px;
  height: 28px;
  border:none;
  outline:none;
  text-align:center;
  border-bottom: 2px solid #202020;
}
.regist-btn{
  width: 300px;
  margin-top: 80px;
  height: 30px;
  padding: 5px 18px;
  font-size: 14px;
  color: #fff;
  background: #202020;
  border: 0;
  border-radius: 25px;
}
</style>
