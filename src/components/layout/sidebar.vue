<template>
  <div class="sidebar">
    <header>
      <p>MS管理系统</p>
    </header>
    <el-menu theme="dark" :router="true" :default-active="$route.path">
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
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/index.scss';
.sidebar {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: $layout-sidebar-width;
  z-index: 2;
  overflow-y: auto;
  background-color: #324157;
  header {
    text-align: center;
    color: #fff;
    font-size: 20px;
    background: #1f2d3d;
    p {
      -webkit-margin-before: 0;
      -webkit-margin-after: 0;
      height:$layout-navbar-height;
      line-height: $layout-navbar-height;
    }
  }
  .el-menu {
    border-radius: 0;
  }
}
</style>
