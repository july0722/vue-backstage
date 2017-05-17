<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="'/dashboard'">首页</el-breadcrumb-item>
      <template v-if="$route.path !== '/dashboard' && permission">
        <el-breadcrumb-item>{{permission.name}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{permission.children.find(c => c.path === $route.path).name}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  name: 'breadcrumb',
  computed: {
    ...mapGetters([
      'currentPermissions'
    ]),
    permission() {
      return this.currentPermissions.find(p => p.children.find(c => c.path === this.$route.path))
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/index.scss';
.breadcrumb {
  box-sizing: border-box;
  position: absolute;
  z-index: 2;
  top: $layout-navbar-height;
  left: $layout-sidebar-width;
  right: 0;
  border-bottom: 1px solid $global-border-color;
  height: $layout-breadcrumb-height;
  line-height: $layout-breadcrumb-height;
  padding-left: $global-gap * 2;
  background: #fff;
  .el-breadcrumb {
    line-height: inherit;
  }
}
</style>
