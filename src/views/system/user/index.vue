<template>
  <div class="user">
    <datagrid :fetch="fetch" :beforeFetch="handleBeforeFetch" @fetch="handleFetch">
      <template slot="table">
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small">编辑</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </datagrid>
  </div>
</template>

<script>
import datagrid from '@/components/common/datagrid'
import * as api from '@/api/system'
export default {
  name: 'user',
  components: {
    datagrid
  },
  data() {
    return {
    }
  },
  methods: {
    fetch: api.getUserList,
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
