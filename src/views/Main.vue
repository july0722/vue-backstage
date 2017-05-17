<template>
  <div class="main">
    <navbar></navbar>
    <sidebar></sidebar>
    <breadcrumb></breadcrumb>
    <div class="view-container">
      <router-view class="view"></router-view>
    </div>
  </div>
</template>

<script>
import navbar from '@/components/layout/navbar'
import sidebar from '@/components/layout/sidebar'
import breadcrumb from '@/components/layout/breadcrumb'

export default {
  name: 'main',
  components: {
    navbar,
    sidebar,
    breadcrumb
  }
}
</script>

<style lang="scss">
@import '../assets/styles/index.scss';
.main {
  .view {
    background: #fff;
    &-container {
      position: absolute;
      z-index: 1;
      top:$layout-breadcrumb-height+$layout-navbar-height;
      left: $layout-sidebar-width;
      right: 0;
      padding: $global-gap*3;
      height: calc(100% - #{$layout-breadcrumb-height} - #{$layout-navbar-height} - #{$global-gap*6});
      overflow-y: auto;
    }
  }
}
</style>
