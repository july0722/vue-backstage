<template>
  <div class="c-grid">
    <div class="c-grid__search">
      <div class="c-grid__toolbar" v-if="$slots.toolbar">
        <slot name="toolbar"></slot>
      </div>
      <el-form size="medium" ref="form" :model="form" v-if="params.length > 0" inline @submit.native.prevent>
        <template v-for="(item, index) in params">
          <el-form-item :key="`params${index}`" :label="item.label" :prop="item.prop" v-if="!item.hidden">
            <el-select
              v-if="item.component === 'select'"
              clearable
              v-bind="omit(item, 'options')"
              v-model="form[item.prop]"
              :style="{ width: `${item.width}px` }"
            >
              <el-option
                v-for="(option, oInedx) in item.options"
                :key="`${item.prop}${oInedx}`"
                v-bind="option"
              ></el-option>
            </el-select>
            <el-radio-group v-else-if="item.component === 'radio'" v-model="form[item.prop]">
              <el-radio v-for="option in item.options" :key="option.value" :label="option.value">{{
                option.label
              }}</el-radio>
            </el-radio-group>
            <component
              v-else-if="item.component !== undefined"
              :is="typeof item.component === 'string' ? `el-${item.component}` : item.component"
              v-bind="item"
              v-model="form[item.prop]"
              :style="{ width: `${item.width}px` }"
            ></component>
            <el-input
              v-else
              clearable
              v-bind="omit(item)"
              v-model.trim="form[item.prop]"
              @keyup.13.native="reload"
              :style="{ width: `${item.width}px` }"
            ></el-input>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button @click="reload">查询</el-button>
          <slot name="toolbar-right"></slot>
        </el-form-item>
      </el-form>
    </div>
    <div class="c-grid__area">
      <header>
        <slot name="header"></slot>
      </header>
      <el-table border ref="table" v-bind="$attrs" v-on="$listeners" :data="data">
        <template v-for="(column, index) in columns">
          <template v-if="!column.hidden">
            <el-table-column
              v-if="column.slot === 'selection'"
              type="selection"
              width="50"
              align="center"
              :key="index"
              :reserve-selection="column['reserve-selection']"
            ></el-table-column>
            <el-table-column
              v-else-if="column.slot === 'index'"
              :key="index"
              label="序号"
              type="index"
              width="50"
              align="center"
              :index="index => index + 1 + (pagination.currentPage - 1) * pagination.pageSize"
            ></el-table-column>
            <slot v-else-if="column.slot" :name="column.slot"></slot>
            <component
              v-else-if="column.component"
              :is="column.component"
              v-bind="column"
              :key="column.prop"
            ></component>
            <el-table-column
              :align="column.align || 'center'"
              show-overflow-tooltip
              v-else-if="column.prop"
              v-bind="column"
              :key="column.prop"
            >
              <template v-slot="{ row }">{{
                {
                  undefined: () => get(row, column.prop),
                  function: () => column.convert(get(row, column.prop), row),
                  string: () => $root.$options.filters[column.convert](get(row, column.prop))
                }[typeof column.convert]()
              }}</template>
            </el-table-column>
          </template>
        </template>
      </el-table>
      <div class="c-grid__pagination" v-if="page">
        <el-pagination
          :layout="pagination.layout"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          :current-page.sync="pagination.currentPage"
          :total="pagination.total"
          @size-change="onSizeChange"
          @current-change="onCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { get, omit, cloneDeep } from 'lodash-es'

export default {
  name: 'c-grid',
  inheritAttrs: false,
  props: {
    columns: {
      required: true,
      default() {
        return []
      }
    },
    source: {
      type: [Function, Array]
    },
    params: {
      type: Array,
      default() {
        return []
      }
    },
    page: {
      type: Boolean,
      default: true
    },
    beforeFetch: {
      type: Function
    },
    afterFetch: {
      type: Function
    },
    autoFetch: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      form: {},
      data: [],
      pagination: {
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50]
      }
    }
  },
  computed: {
    isServer() {
      return typeof this.source === 'function'
    }
  },
  watch: {
    source(val) {
      this.fetch()
    }
  },
  created() {
    this.params
      .filter(x => x.prop)
      .forEach(x => {
        this.$set(this.form, x.prop, x.value || '')
      })
  },
  mounted() {
    this.autoFetch && this.fetch()
  },
  methods: {
    get(object, key) {
      return get(object, key)
    },
    omit(object, ...rest) {
      return omit(object, 'prop', 'component', 'width', rest)
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
    async fetch() {
      let _data = this.source
      const _params = cloneDeep(this.form)
      const _beforeFetch = this.beforeFetch ? this.beforeFetch(_params) : undefined
      if (_beforeFetch === false) {
        return
      }
      if (this.isServer) {
        const { data } = await this.source({
          ...(_beforeFetch || _params),
          pageSize: this.page ? this.pagination.pageSize : undefined,
          pageNum: this.page ? this.pagination.currentPage : undefined
        })
        if (this.page) {
          _data = get(data, 'data')
          this.pagination.total = get(data, 'pageBean.count')
        } else {
          _data = get(data, 'data') || data
        }
      } else {
        if (this.page) {
          _data = this.source.slice(
            (this.pagination.currentPage - 1) * this.pagination.pageSize,
            this.pagination.currentPage * this.pagination.pageSize
          )
          this.pagination.total = this.source.length
        }
      }
      const _afterFetch = this.afterFetch ? this.afterFetch(_data) : undefined
      this.data = _afterFetch || _data
    },
    reload() {
      this.pagination.currentPage = 1
      this.fetch()
    }
  }
}
</script>

<style lang="scss">
.c-grid {
  &__toolbar {
    height: 100%;
    padding: 5px 0;
  }
  &__search {
    &:not(:empty) {
      background: #fff;
      padding: 7px 12px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }
    .el-button {
      height: 36px;
      line-height: 36px;
      padding: 0 20px;
      border-radius: 4px;
      margin-right: 0;
    }
    .el-form {
      flex: 1;
      text-align: right;
      .el-form-item {
        margin: 5px 0 5px 10px;
        &:first-of-type {
          margin-left: 0;
        }
      }
    }
  }
  &__area {
    background: #fff;
    padding: 12px;
    > header:not(:empty) {
      margin-bottom: 12px;
    }
  }
  .el-table__empty-block {
    min-height: 50px;
  }
  .el-table__empty-text {
    line-height: 50px;
  }
  .el-table__header {
    background: #edf3fd;
  }
  .el-table-column--selection .cell {
    display: flex;
    justify-content: center;
  }
  .el-table--border {
    border: 1px solid #ebeef5 !important;
    border-bottom: none !important;
  }
  .el-table-column--selection .cell {
    padding: 0 !important;
  }
  .cell {
    .el-button {
      padding: 0;
      background: transparent;
      color: #3d89fa;
      &:hover {
        color: #2160c1;
      }
      &.is-disabled {
        color: #c0c4cc !important;
        background: transparent;
      }
    }
  }
  .el-date-editor .el-range-input {
    text-align: center;
  }
  .el-range-editor--medium.el-input__inner {
    height: 36px;
  }
  .el-pagination {
    margin-top: 12px;
  }
}
</style>
