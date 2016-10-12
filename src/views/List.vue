<template>
<div class="list">
  <el-row>
    <el-input placeholder="请输入内容" style="width: 300px;" v-model="table.keyword">
      <el-button slot="append" icon="search"></el-button>
    </el-input>
    <el-button type="primary" icon="plus">添加</el-button>
    <el-popover ref="popoverDelete" placement="top" width="160" v-model="isShowPopover">
      <p>已选择{{multipleSelection.length}}项，你确定删除这些记录吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click.native="isShowPopover = false">取消</el-button>
        <el-button size="mini" type="primary" @click.native="isShowPopover = false">确定</el-button>
      </div>
    </el-popover>
    <el-button type="danger" icon="delete" :disabled="multipleSelection.length == 0" v-popover:popoverDelete>批量删除</el-button>
  </el-row>
  <el-table selection-mode="multiple" border :data="table.data" @selectionchange="handleSelectionChange">
    <el-table-column type="selection" width="50"></el-table-column>
    <el-table-column property="date" label="日期" sortable></el-table-column>
    <el-table-column property="name" label="姓名"></el-table-column>
    <el-table-column property="address" label="地址" :show-tooltip-when-overflow="true"></el-table-column>
    <el-table-column inline-template label="操作" width="78">
      <el-button size="small" type="text">编辑</el-button>
    </el-table-column>
  </el-table>
  <el-pagination layout="total, sizes, prev, pager, next, jumper" :current-page="table.currentPage" :page-sizes="[15, 30, 50, 100]" :page-size="table.pageSize" :total="table.total" @sizechange="handleSizeChange" @currentchange="handleCurrentChange"></el-pagination>
</div>
</template>

<script>
import api from '../api'

export default {
  data() {
    return {
      table: {
        data: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路上海市普陀区金沙江路'
        }, {
          date: '2016-04-02',
          name: '李小狮',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        keyword: '',
        currentPage: 1,
        pageSize: 15,
        total: 0
      },
      multipleSelection: [],
      isLoading: true,
      isShowPopover: false
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      this.isLoading = true
      api.fetchUserList({
        keyword: this.table.keyword,
        currentPage: this.table.currentPage,
        pageSize: this.table.pageSize
      }).then((response) => {
        this.isLoading = false
        this.table.data = response.data
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.table.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.table.currentPage = val
      this.fetchData()
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/fn.scss';

.list {
  .el-pagination {
    text-align: right;
    padding: $global-gap*2 0 0;
  }
  td {
    position: relative;
  }
  .el-row {
    padding-bottom: $global-gap*2;
    > * {
      float: left;
    }
    > .el-input-group,
    > .el-button {
      margin-right: $global-gap/2;
    }
  }
}
</style>
