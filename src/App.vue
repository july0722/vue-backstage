<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import './assets/styles/index.scss';
@import '~normalize.css';
@import '~element-ui/lib/theme-default/index.css';
[class$="-editor"] {
  .el-input,
  .el-input-number {
    width: $global-input-width;
  }
  .el-form-item__label {
    width: $global-input-label-width;
  }
  .el-form-item__content {
    margin-left: $global-input-label-width;
  }
}
</style>
