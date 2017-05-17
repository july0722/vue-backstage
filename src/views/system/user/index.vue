<template>
  <div class="user">
    <datagrid ref="datagrid" :search-form="form" :fetch="fetch" :beforeFetch="handleBeforeFetch" @fetch="handleFetch">
      <template slot="action">
        <el-form inline>
          <el-form-item>
            <el-input v-model="form.username" placeholder="用户名" @keyup.enter.native="$refs.datagrid.refresh()"></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="form._date" type="daterange" placeholder="日期范围" @change="handleChange"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="$refs.datagrid.refresh()">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">新增</el-button>
            <el-button type="primary">删除</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template slot="table">
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="text">编辑</el-button>
            <el-button size="small" type="text">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </datagrid>
    <editor :model.sync="model"></editor>
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
      form: {
        username: '',
        _date: '',
        beginDate: '',
        endDate: ''
      }
    }
  },
  methods: {
    fetch: api.getUserList,
    handleChange() {
      if (this.form._date[0]) {
        this.form.beginDate = this.form._date[0].getTime()
        this.form.endDate = this.form._date[1].getTime()
      } else {
        this.form.beginDate = this.form.endDate = ''
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
