<template>
  <div class="user">
    <datagrid ref="datagrid" :search="search" :resource="resource" :beforeFetch="handleBeforeFetch" @fetch="handleFetch" @init="handleInit">
      <template slot="search">
        <el-input v-model="search.username" placeholder="用户名" @keyup.enter.native="$refs.datagrid.refresh()"></el-input>
        <el-date-picker v-model="search._date" type="daterange" placeholder="日期范围" @change="handleChange"></el-date-picker>
      </template>
      <template slot="action">
        <el-button type="success" @click="edit({})">弹窗新增</el-button>
        <el-button type="success" @click="$router.push('/user/-1')">跳转新增</el-button>
      </template>
      <template slot="table">
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column :sortable="'custom'" prop="date" label="日期"></el-table-column>
        <el-table-column prop="date" label="状态">
          <template scope="scope">
            <el-tag v-if="scope.row.status === 0" type="gray">停用</el-tag>
            <el-tag v-else type="success">启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="text" @click="edit(scope.row)">弹窗编辑</el-button>
            <el-button size="small" type="text" @click="$router.push(`/user/${scope.row.id}`)">跳转编辑</el-button>
            <el-button size="small" type="text" @click="$refs.datagrid.delete(scope.row.id, scope.row.account)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </datagrid>
    <_editor ref="editor" :model="model" @success="$refs.datagrid.refresh()"></_editor>
  </div>
</template>

<script>
import datagrid from '@/components/common/datagrid'
import _editor from './_editor'
import editor from './editor'
import * as api from '@/api/system'
export default {
  name: 'user',
  components: {
    datagrid,
    _editor,
    editor
  },
  data() {
    return {
      resource: api.user,
      model: {},
      search: {
        username: '',
        _date: '',
        beginDate: '',
        endDate: ''
      }
    }
  },
  methods: {
    edit(model) {
      this.model = model
      this.$refs.editor.visible = true
    },
    handleInit({ table }) {
      table.defaultSort = { prop: 'date', order: 'descending' }
    },
    handleChange() {
      if (this.search._date[0]) {
        this.search.beginDate = this.search._date[0].getTime()
        this.search.endDate = this.search._date[1].getTime()
      } else {
        this.search.beginDate = this.search.endDate = ''
      }
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
