<template>
  <div class="datagrid">
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
  // .el-form--inline .el-form-item {
  //   margin-bottom: $global-gap * 2;
  // }
  .el-pagination {
    padding: $global-gap 0 0;
  } // &__action:not(:empty) {
  //   padding-bottom: $global-gap * 2;
  // }
}
</style>
