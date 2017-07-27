<template>
  <div class="datagrid">
    <section>
      <div>
        <slot name="search"></slot>
        <el-button v-if="search" type="primary" @click="refresh()">搜索</el-button>
      </div>
      <div>
        <slot name="action"></slot>
        <template>
          <el-popover ref="popover" placement="top" v-model="action.visibleRemove">
            <p>是否确认删除所勾选的
              <strong>&nbsp;{{table.multipleSelection.length}}&nbsp;</strong>条记录？</p>
            <div style="text-align:right">
              <el-button size="mini" type="text" @click="action.visibleRemove = false">取消</el-button>
              <el-button type="primary" size="mini" @click="handleRemove">确定</el-button>
            </div>
          </el-popover>
          <el-button type="danger" v-popover:popover :disabled="table.multipleSelection.length === 0">删除</el-button>
        </template>
      </div>
    </section>
    <el-row v-loading="table.loading">
      <el-table :data="table.data" :default-sort="table.defaultSort" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
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
    search: Object,
    beforeFetch: Function,
    resource: Function
  },
  data() {
    return {
      action: {
        visibleRemove: false
      },
      table: {
        data: [],
        loading: false,
        defaultSort: {},
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
  created() {
    this.$emit('init', { table: this.table, page: this.page })
  },
  mounted() {
    this.table.defaultSort.prop || this.refresh()
  },
  methods: {
    refresh() {
      this.page.currentPage === 1 ? this.load() : this.page.currentPage = 1
    },
    fetchData() {
      this.table.loading = true
      this.resource.get('', {
        ...this.search,
        ...this.table.defaultSort,
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
    handleRemove() {
      this.action.visibleRemove = false
      this.resource.delete(this.table.multipleSelection).then(response => {
        this.refresh()
      })
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
    },
    handleSortChange({ prop, order }) {
      this.table.defaultSort = { prop: prop, order: order }
      this.refresh()
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/_shared.scss';
.datagrid {
  section {
    font-size: 0;
    margin-bottom: $global-gap*2;
    display: flex;
    justify-content: space-between;
  }
  div[class="el-input"] {
    width: initial;
  }
  .el-input,
  .el-button:not(:last-of-type) {
    margin-right: $global-gap;
  }
  .el-button+.el-button {
    margin-left: 0;
  }
  .el-pagination {
    padding: $global-gap 0 0;
  }
}
</style>
