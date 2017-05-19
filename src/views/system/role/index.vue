<template>
  <div class="user">
    <datagrid ref="datagrid" :search="search" :fetch="fetch" :remove="remove" :beforeFetch="handleBeforeFetch" @fetch="handleFetch">
      <template slot="search">
        <el-input v-model="search.username" placeholder="用户名" @keyup.enter.native="$refs.datagrid.refresh()"></el-input>
      </template>
      <template slot="action">
        <el-button type="success" @click="edit()">新增</el-button>
      </template>
      <template slot="table">
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="date" label="状态">
          <template scope="scope">
            <el-tag v-if="scope.row.status === 0" type="gray">停用</el-tag>
            <el-tag v-else type="success">启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="text" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </template>
    </datagrid>
    <!--<editor ref="editor" :model="model" @success="$refs.datagrid.refresh()"></editor>-->
  </div>
</template>

<script>
import datagrid from '@/components/common/datagrid'
// import editor from './_editor'
import * as api from '@/api/system'
export default {
  name: 'user',
  components: {
    datagrid
  },
  data() {
    return {
      model: {},
      search: {
        username: ''
      }
    }
  },
  methods: {
    fetch: api.getUserList,
    remove: api.removeUser,
    edit(model = {}) {
      this.model = model
      this.$refs.editor.visible = true
    },
    handleBeforeFetch(done) {
      console.log('handleBeforeFetch')
      done()
    },
    handleFetch() {
      console.log('handleFetch')
    }
  }
}
</script>

<style lang="scss">

</style>
