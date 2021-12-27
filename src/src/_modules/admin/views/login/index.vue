<template>
  <div class="em-login">
    <div class="em-login-box">
      <div class="em-login-content">
        <!--头部-->
        <div class="em-login-content-header">
          <div class="em-login-content-header-logo">
            <img class="em-login-content-header-logo-img" :src="config.logo" />
          </div>
          <div class="em-login-content-header-title">{{ config.title }}</div>
        </div>
        <!--表单-->
        <el-form class="em-login-content-form" ref="form" :model="form" :rules="rules">
          <el-form-item prop="userCode">
            <el-input v-model="form.userCode" placeholder="用户名">
              <template v-slot:prefix>
                <em-icon name="user" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password" autocomplete="off" placeholder="密码">
              <template v-slot:prefix>
                <em-icon name="eye" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item style="text-align: right">
            <el-button :loading="loading" class="btn-login" type="primary" @click="tryLogin">登录</el-button>
          </el-form-item>
        </el-form>
        <!--第三方-->
        <div class="em-login-content-other">
          <div class="em-login-content-other-item" v-for="(item, index) in others" :key="index">
            <img :src="item.img" />
          </div>
        </div>
      </div>
    </div>
    <!--底部-->
    <div class="em-login-copyright">{{ config.copyright }}</div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
const api = $api.admin.auth
export default {
  data() {
    return {
      form: {
        userCode: '',
        password: ''
      },
      others: [{ img: require('../../assets/images/wechat.png') }, { img: require('../../assets/images/qq.png') }, { img: require('../../assets/images/qywx.png') }],
      rules: {
        userCode: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      },
      loading: false
    }
  },
  computed: {
    ...mapState('app/system', { config: (s) => s.config })
  },
  methods: {
    // 登录
    tryLogin() {
      this.$refs.form.validate(async (valid) => {
        try {
          if (!valid) return false
          this.loading = true
          const result = await api.login(this.form)
          // 初始化令牌
          this.$store.commit('app/token/init', result)

          let redirect = this.$route.query.redirect
          if (!redirect || redirect === '') {
            redirect = '/'
          }

          this.$router.push({
            path: redirect
          })
        } catch (err) {
          this._error(err)
        } finally {
          this.loading = false
        }
      })
    }
  },
  mounted() {
    const _this = this
    document.onkeydown = function (e) {
      let ev = document.all ? window.event : e
      if (ev.keyCode === 13) {
        _this.tryLogin()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.em-login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-position: center center;
  background-image: url('../../assets/images/login-bg.jpg');
  z-index: -1;

  &-box {
    padding: 10px 24px;
    border-radius: 5px;
    text-align: center;
    width: 460px;
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0px 0px 12px #ccc;
  }

  &-content {
    &-header {
      width: 100%;

      &-logo {
        height: 65px;
        text-align: center;
        margin-top: 10px;
        &-img {
          height: 65px;
        }
      }

      &-title {
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 44px;
        font-weight: 800;
        margin-top: 12px;
        background-image: -webkit-linear-gradient(bottom, #1ccef4, #f053aa, #fbfcfd);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    &-form {
      box-sizing: border-box;
      padding: 30px;
    }

    .btn-login {
      width: 100%;
      cursor: pointer;
    }

    &-other {
      display: flex;
      flex-direction: row;
      justify-content: center;
      height: 45px;

      &-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
        background: #fff;
        img {
          width: 60%;
          height: 60%;
        }
        &:hover {
          cursor: pointer;
          background: rgba(41, 105, 171, 0.5);
        }
      }
    }
  }

  &-copyright {
    position: absolute;
    bottom: 22px;
    width: 100%;
    text-align: center;
    font-size: 13px;
    color: #909399;
  }

  .em-icon {
    font-size: 1.6em;
    vertical-align: -0.3em;
  }

  .el-input__inner {
    padding-left: 35px !important;
  }

  .el-button--primary {
    background-color: #2969ab !important;
    border-color: #2969ab !important;
    font-size: 14px;
    letter-spacing: 8px;
  }
}
</style>
