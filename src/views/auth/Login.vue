<template>
<div class="auth-login">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
    <el-form-item prop="account">
      <el-input v-model="ruleForm.account" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.native.prevent="handleSubmit" :loading="isLoading">登录</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import {
  mapActions
} from 'vuex'
export default {
  data() {
    return {
      ruleForm: {
        account: '',
        password: ''
      },
      rules: {
        account: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      },
      isLoading: false
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    handleSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.isLoading = true
          this.login({
            account: this.ruleForm.account,
            password: this.ruleForm.password
          }).then((response) => {
            console.log(this.$route)
            this.$router.push(this.$route.query.redirect || '/dashboard')
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.auth-login {
    button {
        width: 100%;
    }
}
</style>
