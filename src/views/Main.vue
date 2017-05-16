<template>
  <div class="main">
    <navbar></navbar>
    <sidebar></sidebar>
    <div class="view-container">
      <router-view class="view"></router-view>
      <!-- <el-breadcrumb separator="/">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        </el-breadcrumb>
        <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
          <router-view class="main-view animated"></router-view>
        </transition> -->
    </div>
  </div>
</template>

<script>
import navbar from '@/components/layout/navbar'
import sidebar from '@/components/layout/sidebar'

export default {
  name: 'main',
  components: {
    navbar,
    sidebar
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
@import '../assets/styles/index.scss';
.main {
  .view {
    background: #fff;
    padding: $global-gap*3;
    box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
    &-container {
      margin-left: $layout-sidebar-width;
      padding: $global-gap*2 + $layout-navbar-height $global-gap*2 $global-gap*2;
    }
  }
  .el-breadcrumb {
    margin-bottom: $global-gap*2;
  }
}
</style>
