<template>
  <div class="user-editor">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="账号" prop="account">
        <el-input placeholder="请输入账号" v-model="form.account" :disabled="!isCreate"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="form.status" on-text="启用" off-text="停用" on-color="#13ce66" :on-value="1" :off-value="0"></el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$router.go(-1)">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </div>
</template>

<script>
import * as api from '@/api/system'
export default {
  name: 'user-editor',
  computed: {
    isCreate() {
      return this.$route.params.id === '-1'
    }
  },
  beforeRouteEnter(to, from, next) {
    to.params.id === '-1' ? next() : api.user.get(to.params.id).then(response => {
      console.log(response)
      response.successful ? next(vm => {
        Object.assign(vm.form, response.data.user)
      }) : next('/error')
    })
  },
  data() {
    return {
      visible: false,
      form: {
        account: '',
        username: '',
        status: 0
      },
      rules: {
        account: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }],
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          api.user[this.isCreate ? 'post' : 'put'](this.isCreate ? '' : `${this.form.id}`, this.form).then(response => {
            if (response.successful) {
              this.$router.go(-1)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../../assets/styles/shared';
</style>
