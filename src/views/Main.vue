<template>
  <div class="main">
    <sidebar></sidebar> <navbar></navbar>
    <div
      class="view-container"
      :class="{ collapse: $store.state.app.sidebar.collapse }"
    >
      <keep-alive :include="$store.state.app.cachePage">
        <router-view class="view"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import navbar from '@/components/layout/navbar'
import sidebar from '@/components/layout/sidebar'

export default {
  // name: 'main',
  components: {
    navbar,
    sidebarFF
  }
}
</script>

<style lang="scss">
@import '../assets/styles/_shared.scss';
.main {
  .view {
    padding: $global-gap * 3;
    height: calc(100% - #{$global-gap * 6});
    overflow-y: auto;
    &-container {
      background: #fff;
      position: absolute;
      top: $layout-navbar-height;
      left: $layout-sidebar-width;
      right: 0;
      bottom: 0;
      transition: $--all-transition;
      &.collapse {
        left: $layout-sidebar-collapse-width;
      }
    }
  }
}
</style>
