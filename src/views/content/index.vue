<template>
  <div class="content">
    <c-tab :tabs="tabs">
      <template>
        <el-button round size="mini" @click="$router.push('/art/article/edit/0')">新建文章</el-button>
      </template>
    </c-tab>
  </div>
</template>

<script>
import cTab from '@/components/common/tab'
import drafts from './_drafts'
import publish from './_publish'

export default {
  name: 'content',
  components: { cTab },
  data() {
    return {
      tabs: [
        {
          name: '草稿箱',
          code: 'drafts',
          component: drafts
        },
        {
          name: '已发布',
          code: 'publish',
          component: publish
        }
      ]
    }
  }
}
</script>
