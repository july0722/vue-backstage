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
    padding: $global-gap*3;
    height: calc(100% - #{$layout-breadcrumb-height});
    overflow-y: auto;
    &-container {
      background: #fff;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: $layout-breadcrumb-height+$layout-navbar-height 0 0  $layout-sidebar-width;
    }
  }
}
</style>
