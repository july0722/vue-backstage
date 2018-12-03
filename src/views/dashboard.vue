<template>
  <div class="login">
    <el-form ref="form" :model="form" :rules="rules">
      <h3>系统登录</h3>
      <el-form-item prop="account">
        <el-input
          v-model="form.account"
          placeholder="请输入账号"
          @keyup.enter.native="onSubmit"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
          @keyup.enter.native="onSubmit"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data() {
    return {
      form: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          {
            required: true,
            message: '请输入账号',
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
  methods: {
    ...mapActions(['login']),
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.login({
            account: this.form.account,
            password: this.form.password
          })
            .then(response => {
              if (response.successful) {
                this.$router.push(this.$route.query.redirect || '/dashboard')
              }
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login {
  padding: 36px;
  border: 2px solid #8492a6;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  input:-webkit-autofill {
    outline: none;
    box-shadow: 0 0 0 1000px white inset;
    background-color: #fff !important;
  }
  button {
    width: 100%;
  }
}
</style>
