<template>
  <div class="main">
    <navbar></navbar>
    <sidebar></sidebar>
    <div class="view-container">
      <router-view class="view"></router-view>
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
  }
}
</script>

<style lang="scss">
@import '../assets/styles/_shared.scss';
.main {
  .view {
    padding: $global-gap*3;
    height: calc(100% - #{$global-gap*6});
    overflow-y: auto;
    &-container {
      background: #fff;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: $layout-navbar-height 0 0 $layout-sidebar-width;
    }
  }
  [class*="-editor"]  {
    .el-input.el-date-editor,
    .el-select {
      width: $global-input-width;
    }
    .el-form-item__label {
      width: $global-input-label-width;
    }
    .el-form-item__content {
      margin-left: $global-input-label-width;
    }
  }
}
</style>
