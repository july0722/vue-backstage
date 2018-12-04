<template>
  <div class="user">
    <c-table :fields="fields" :columns="columns" url="/sys/user">
      <el-button
        slot="operate"
        size="medium"
        round
        @click="$router.push('/sys/user/operation/edit/0')"
      >创建运营用户</el-button>
      <el-table-column slot="status" label="状态" width="130">
        <template slot-scope="{ row }">
          <i :class="[`bg-${row.status === 0 ? 'success' : 'danger'}`]"></i>
          {{row.status === 0? '正常' : '锁定'}}
        </template>
      </el-table-column>
      <el-table-column slot="operation" label="操作">
        <template slot-scope="{ row }">
          <el-button size="mini" @click="$router.push(`/sys/user/operation/edit/${row.userId}`)">编辑</el-button>
          <el-button
            v-if="row.status === 0"
            size="mini"
            type="danger"
            @click="onOperate(row, $event)"
          >禁用</el-button>
          <el-button v-else size="mini" type="success" @click="onOperate(row, $event)">启用</el-button>
        </template>
      </el-table-column>
    </c-table>
  </div>
</template>

<script>
import cTable from '@/components/common/table'

export default {
  name: 'user',
  components: { cTable },
  data() {
    return {
      fields: [
        {
          prop: 'name',
          placeholder: '姓名 / 账号',
          clearable: true
        },
        {
          prop: 'status',
          placeholder: '状态',
          type: 'select',
          clearable: true,
          options: [
            {
              label: '已审核',
              value: 0
            },
            {
              label: '未提交',
              value: 1
            },
            {
              label: '审核中',
              value: 3
            },
            {
              label: '审核不通过',
              value: 2
            }
          ]
        }
      ],
      columns: [
        { prop: 'name', label: '姓名' },
        { prop: 'account', label: '账号' },
        { prop: 'createtime', label: '创建时间' },
        { slot: 'status' },
        { slot: 'operation' }
      ]
    }
  },
  methods: {
    onOperate(row, event) {
      this.$_confirm({
        operateText: event.target.innerText,
        name: row.account,
        operate: () =>
          this.$http.post(
            `/sys/user/opt/${row.userId}/${
              row.status === 0 ? 'lock' : 'unlock'
            }`
          ),
        callback() {
          row.status = row.status === 1 ? 0 : 1
        }
      })
    }
  }
}
</script>

<style lang="scss"></style>
