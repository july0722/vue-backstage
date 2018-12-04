<template>
  <div class="c-table">
    <div class="c-table__toolbar">
      <el-form v-if="fields" inline size="medium">
        <template v-for="(field, index) in fields">
          <el-form-item
            :key="index"
            :label="field.label"
            :prop="field.prop"
            v-show="field.type !== 'hidden'"
            v-if="field.visible !== false"
          >
            <el-select v-if="field.type === 'select'" v-bind="field" v-model="form[field.prop]">
              <el-option v-for="option in field.options" :key="option.value" v-bind="option"></el-option>
            </el-select>
            <el-cascader
              v-else-if="field.type === 'cascader'"
              v-bind="field"
              v-model="form[field.prop]"
            ></el-cascader>
            <el-input v-else v-bind="field" v-model="form[field.prop]"></el-input>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSearch"></el-button>
        </el-form-item>
      </el-form>
      <div>
        <slot name="operate"></slot>
      </div>
    </div>
    <template v-if="columns.length > 0">
      <el-table
        @current-change="handleCurrentChange"
        :data="data"
        v-loading="loading"
        :highlight-current-row="$attrs['highlight-current-row']"
        height="0"
      >
        <template v-for="(column, index) in columns">
          <slot v-if="column.slot" :name="column.slot"></slot>
          <component
            v-else-if="column.component"
            :is="column.component"
            :column="column"
            :key="index"
          ></component>
          <el-table-column v-else v-bind="column" :key="index">
            <template
              slot-scope="scope"
            >{{ column.filter ? column.filter(scope.row[column.prop]) : scope.row[column.prop]}}</template>
          </el-table-column>
        </template>
      </el-table>
    </template>
    <div v-else v-loading="loading">
      <slot :data="data"></slot>
    </div>
    <div class="c-table__pagination" v-if="paging">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[15, 20, 30, 40, 50, 100]"
        :page-size="pagination.pageSize"
        :current-page.sync="pagination.currentPage"
        :total="pagination.total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'c-table',
  props: {
    url: {
      type: String,
      required: true
    },
    fields: {
      type: Array
    },
    columns: {
      default() {
        return []
      }
    },
    paging: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      form: {},
      loading: false,
      data: [],
      pagination: {
        total: 0,
        currentPage: 1,
        pageSize: 15
      }
    }
  },
  created() {
    this.fields
      .filter(x => x.prop)
      .forEach(x => {
        this.$set(this.form, x.prop, x.value)
      })
  },
  mounted() {
    this.fetch()
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('current-change', val)
    },
    onSearch() {
      this.pagination.currentPage = 1
      this.fetch()
    },
    onSizeChange(pageSize) {
      this.pagination.pageSize = pageSize
      this.pagination.currentPage = 1
      this.fetch()
    },
    onCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage
      this.fetch()
    },
    fetch() {
      this.loading = true
      let data = this.$_.cloneDeep(this.form)
      this.$emit('before-fetch', data)
      this.$http
        .get(this.url, {
          params: {
            ...data,
            pageSize: this.paging ? this.pagination.pageSize : undefined,
            page: this.paging ? this.pagination.currentPage : undefined
          }
        })
        .then(res => {
          if (this.paging) {
            this.$emit('after-fetch', res.data.bean.records)
            this.pagination.total = res.data.bean.total
            this.data = res.data.bean.records
          } else {
            this.$emit('after-fetch', res.data.data)
            this.data = res.data.data
          }
          this.loading = false
        })
        .catch(() => (this.loading = false))
    },
    reload() {
      this.pagination.currentPage = 1
      this.fetch()
    }
  }
}
</script>

<style lang="scss">
@include b(c-table) {
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: calc(100% - 32px);
  @include e(toolbar) {
    position: relative;
    display: flex;
    background: transparent;
    .el-form-item {
      margin-bottom: 10px;
    }
    > div {
      padding: 0 0 10px 0;
      flex: 1;
      text-align: right;
    }
  }
  .el-table {
    overflow-y: visible;
    background: #fff;
    border: 1px solid #dcdfe6;
    box-shadow: 0 6px 15px 0 #d9dbe4;
    border-radius: 4px;
    &:before {
      height: 0;
    }
    td {
      border: none;
    }
    th {
      color: #333;
      &.gutter {
        border-bottom: 1px solid #ebeef5;
      }
    }
    .cell {
      padding: 0 15px;
    }
  }
  .el-table--enable-row-hover .el-table__body .el-table__row:hover > td {
    background: #f2f2f2 !important;
    &:first-of-type:before {
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      border-left: 2px solid #409eff;
    }
  }
  @include e(pagination) {
    text-align: right;
    .el-pagination {
      padding: 10px 15px 0;
      .el-select .el-input .el-input__inner {
        border-radius: 4px;
      }
      &.is-background .btn-next,
      .btn-prev,
      .el-pager li {
        background: #fff;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
      }
    }
  }
}
</style>
