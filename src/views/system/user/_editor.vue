<template>
  <div class="user-editor">
    <el-dialog :title="`${created ? '编辑' : '新增'}用户`" :visible.sync="visible" size="large" @open="handleOpen">
      <el-form ref="form" label-width="96px" :model="form">
        <el-form-item label="备注">
          <el-input placeholder="请输入备注" v-model="form.note"></el-input>
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
import {
  mapGetters
} from 'vuex'
export default {
  name: 'user-editor',
  props: ['model'],
  computed: {
    ...mapGetters([
      'currentNode'
    ])
  },
  data() {
    return {
      visible: false,
      form: {
        username: ''
      },
      loading: false
    }
  },
  methods: {
    handleSubmit() {
      let _submit = this.created ? api.updateUser : api.createUser
      _submit(this.form).then(response => {
        if (response.successful) {
          this.visible = false
          this.$emit('update:model', this.form)
        }
      })
    },
    handleOpen() {
      Object.assign(this.form, this.model)
    }
  }
}
</script>

<style lang="scss">
@import '../../../assets/styles/index';
</style>
