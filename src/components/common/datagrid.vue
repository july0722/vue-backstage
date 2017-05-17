<template>
  <div class="datagrid">
    <!--<div class="datagrid__action">
      <slot name="action"></slot>
      <template v-if="remove">
        <el-popover ref="popover" placement="right" v-model="action.visibleRemove">
          <p>是否确认删除所勾选的
            <strong>&nbsp;{{table.multipleSelection.length}}&nbsp;</strong>条记录？</p>
          <div>
            <el-button size="mini" type="text" @click="action.visibleRemove = false">取消</el-button>
            <el-button type="primary" size="mini" @click="handleRemove">确定</el-button>
          </div>
        </el-popover>
        <el-button type="danger" v-popover:popover :disabled="table.multipleSelection.length === 0">删除</el-button>
      </template>
    </div>-->
    <el-row>
      <slot name="action"></slot>
    </el-row>
    <el-row v-loading="table.loading">
      <el-table :data="table.data" @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <slot name="table"></slot>
      </el-table>
      <el-pagination v-if="page.total / page.pageSize > 1" :layout="page.layout" :current-page.sync="page.currentPage" :page-size="page.pageSize" :total="page.total" @current-change="handleCurrentChange"></el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'datagrid',
  props: {
    searchForm: Object,
    fetch: Function,
    beforeFetch: Function
  },
  data() {
    return {
      table: {
        data: [],
        loading: false,
        multipleSelection: []
      },
      page: {
        total: 10,
        currentPage: 1,
        pageSize: 10,
        layout: 'total, ->, prev, pager, next'
      }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    refresh() {
      this.page.currentPage === 1 ? this.load() : this.page.currentPage = 1
    },
    fetchData() {
      this.table.loading = true
      this.fetch({
        ...this.searchForm,
        page: this.page.currentPage,
        pageSize: this.page.pageSize
      }).then(response => {
        this.table.data = Object.freeze(Object.values(response.data).find(x => x instanceof Array))
        this.page.total = response.data.count
        this.table.loading = false
        this.$emit('fetch', response)
      })
    },
    load() {
      typeof this.beforeFetch === 'function' ? this.beforeFetch(this.fetchData) : this.fetchData()
    },
    handleCurrentChange(val) {
      this.load()
    },
    handleSelectionChange(val) {
      this.table.multipleSelection = []
      val.forEach(item => {
        this.table.multipleSelection.push(item.id)
      })
      this.$emit('selectionChange', this.table.multipleSelection)
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/index.scss';
.datagrid {
  .el-form--inline .el-form-item {
    margin:0 $global-gap/2 $global-gap*2 0;
  }
  .el-pagination {
    padding: $global-gap 0 0;
  } // &__action:not(:empty) {
  //   padding-bottom: $global-gap * 2;
  // }
}
</style>
