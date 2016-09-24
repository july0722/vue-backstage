<template>
<div>
  <el-row>
    <el-input placeholder="请输入内容" v-model="input5" style="width: 300px;">
      <el-button slot="append" icon="search"></el-button>
    </el-input>
    <el-button type="primary" icon="plus">添加</el-button>
    <el-button type="danger" icon="delete">批量删除</el-button>
  </el-row>
  <el-table :data="tableData" selection-mode="multiple" border @selectionchange="handleMultipleSelectionChange">
    <el-table-column type="selection" width="50">
    </el-table-column>
    <el-table-column property="date" label="日期" sortable>
    </el-table-column>
    <el-table-column property="name" label="姓名">
    </el-table-column>
    <el-table-column property="address" label="地址" :show-tooltip-when-overflow="true">
    </el-table-column>
    <el-table-column inline-template label="操作" width="120">
      <div><a href="#">编辑</a>&nbsp;<a href="#">删除</a></div>
    </el-table-column>
  </el-table>
  <el-pagination :current-page="5" :page-sizes="[15, 30, 50, 100]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="100"></el-pagination>
</div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路上海市普陀区金沙江路'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss">@import '../assets/styles/fn.scss';
.el-pagination {
    text-align: right;
    padding-top: $global-gap*2;
}
.el-row {
    padding-bottom: $global-gap*2;
    > * {
        float: left;
    }
}
.el-input-group {
    padding-right: $global-gap*2;
}
</style>
