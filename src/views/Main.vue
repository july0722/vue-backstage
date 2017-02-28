<template>
<div class="main">
  <navbar></navbar>
  <sidebar></sidebar>
  <div class="main-wrapper">
    <router-view class="main-view"></router-view>
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
import Navbar from '@/components/common/Navbar.vue'
import Sidebar from '@/components/common/Sidebar.vue'

export default {
  components: {
    Navbar,
    Sidebar
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
@import '../assets/styles/base.scss';
.main {
  &-wrapper {
    margin-left: $global-sidebar-width;
    padding: $global-gap*2 + $global-navbar-height $global-gap*2 $global-gap*2;
  }
  &-view {
    background: #fff;
    padding: $global-gap*3;
    box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
  }
  .el-breadcrumb {
    margin-bottom: $global-gap*2;
  }
}
</style>
