<template>
  <div class="user-editor">
    <el-dialog size="small" :title="`${isCreate ? '新增' : '编辑'}用户`" :visible.sync="visible" @open="handleOpen" @close="handleClose">
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
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/system'
export default {
  name: 'user-editor',
  props: ['model'],
  computed: {
    isCreate() {
      return this.model.id === undefined
    }
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
              this.visible = false
              this.$emit('success')
            }
          })
        }
      })
    },
    handleOpen() {
      setTimeout(() => {
        Object.assign(this.form, this.model)
      }, 0)
    },
    handleClose() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss">
@import '../../../assets/styles/index';
</style>
