<template>
  <div class="user">
    <datagrid ref="datagrid" :search="search" :fetch="fetch" :remove="remove" :beforeFetch="handleBeforeFetch" @fetch="handleFetch">
      <template slot="search">
        <el-input v-model="search.username" placeholder="用户名" @keyup.enter.native="$refs.datagrid.refresh()"></el-input>
        <el-date-picker v-model="search._date" type="daterange" placeholder="日期范围" @change="handleChange"></el-date-picker>
      </template>
      <template slot="action">
        <el-button type="success" @click="edit()">新增</el-button>
        <el-button type="info" @click="edit()">绑定</el-button>
      </template>
      <template slot="table">
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="text" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </template>
    </datagrid>
    <editor ref="editor" :model="model" @success="$refs.datagrid.refresh()"></editor>
  </div>
</template>

<script>
import datagrid from '@/components/common/datagrid'
import editor from './_editor'
import * as api from '@/api/system'
export default {
  name: 'user',
  components: {
    datagrid,
    editor
  },
  data() {
    return {
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
    fetch: api.getUserList,
    remove: api.removeUser,
    edit(model = {}) {
      this.model = model
      this.$refs.editor.visible = true
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
