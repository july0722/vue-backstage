<template>
  <div class="password">
    <el-form ref="form" label-width="88px" :model="form" :rules="rules">
      <el-form-item label="原密码" prop="oldPwd">
        <el-input v-model="form.oldPwd"></el-input>
      </el-form-item>
      <el-form-item required label="新密码" prop="newPwd">
        <el-input type="password" v-model="form.newPwd" auto-complete="new-pwd"></el-input>
      </el-form-item>
      <el-form-item required label="确认密码" prop="checkPwd">
        <el-input type="password" v-model="form.checkPwd" auto-complete="check-pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as api from '@/api/auth'
import {
  mapGetters
} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  data() {
    const validaeNewPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (value.length < 6) {
        callback(new Error('密码长度不能少于6个字符'))
      } else {
        this.form.checkPwd !== '' && this.$refs.form.validateField('checkPwd')
        callback()
      }
    }
    const validaeCheckPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.form.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        oldPwd: '',
        newPwd: '',
        checkPwd: ''
      },
      rules: {
        oldPwd: [{
          required: true,
          message: '请输入原密码',
          trigger: 'blur'
        }],
        newPwd: [{
          validator: validaeNewPwd,
          trigger: 'blur'
        }],
        checkPwd: [{
          validator: validaeCheckPwd,
          trigger: 'blur'
        }]
      },
      loading: false
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          api.updatePassword({
            account: this.currentUser.account,
            oldPwd: this.form.oldPwd,
            newPwd: this.form.newPwd
          }).then(response => {
            response.successful ? this.$router.push('/logout') : this.loading = false
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../../assets/styles/index.scss';

.password {
  .el-input {
    width: $global-input-width;
  }
  input:-webkit-autofill {
    box-shadow: 0 0 0px 18px white inset;
    background-color: #fff!important;
  }
}
</style>
