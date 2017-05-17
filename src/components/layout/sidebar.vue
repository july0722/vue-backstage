<template>
  <div class="sidebar">
    <el-menu :router="true" :default-active="currentRouter">
      <el-submenu v-if="permission1.children" v-for="(permission1, index) in currentPermissions" :key="index" :index="permission1.children[0].path">
        <template slot="title">
          <i :class="`iconfont icon-${permission1.icon}`"></i>{{permission1.name}}
        </template>
        <el-menu-item v-for="(permission2, index) in permission1.children" :key="index" :index="permission2.path">{{permission2.name}}</el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="permission1.path">
        <i :class="`iconfont icon-${permission1.icon}`"></i>{{permission1.name}}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  name: 'sidebar',
  computed: {
    ...mapGetters([
      'currentPermissions'
    ])
  },
  data() {
    return {
      currentRouter: this.$router.history.current.fullPath
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/index.scss';
.sidebar {
  box-sizing: border-box;
  position: absolute;
  top: $layout-navbar-height;
  left: 0;
  bottom: 0;
  width: $layout-sidebar-width;
  z-index: 2;
  background: #fff;
  border-right: 1px solid $global-border-color;
  overflow-y: auto;
  overflow-x: hidden;
  .el-menu {
    border-radius: 0;
    height: 100%;
  }
}
</style>
