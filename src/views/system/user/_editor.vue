<template>
  <div class="user-editor">
    <el-dialog size="large" :title="`${isCreate ? '新增' : '编辑'}用户`" :visible.sync="visible" @open="handleOpen" @close="handleClose">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
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
        username: ''
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }]
      },
      loading: false
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let _submit = this.created ? api.createUser : api.updateUser
          _submit(this.form).then(response => {
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
