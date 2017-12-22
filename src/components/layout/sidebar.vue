<template>
  <el-menu class="sidebar" :router="true" :default-active="$route.path" :collapse="$store.state.app.sidebar.collapse">
    <header>
      <p>MS管理系统</p>
    </header>
    <el-submenu v-if="router1.children" v-for="(router1, index) in appRouter" :key="index" :index="router1.children[0].path">
      <template slot="title">
        <i :class="`el-icon-${router1.icon}`"></i>
        <span slot="title">{{router1.name}}</span>
      </template>
      <el-menu-item v-for="(router2, index) in router1.children" :key="index" :index="router2.path">{{router2.name}}</el-menu-item>
    </el-submenu>
    <el-menu-item v-else :index="router1.path">
      <i :class="`el-icon-${router1.icon}`"></i>
      <span slot="title">{{router1.name}}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { appRouter } from '../../router/routes'

export default {
  name: 'sidebar',
  computed: {},
  data() {
    return {
      appRouter: appRouter
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/_shared.scss';

.sidebar {
  &:not(.el-menu--collapse) {
    width: $layout-sidebar-width;
  }
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  height: 100%;
  // header {
  //   text-align: center;
  //   color: #fff;
  //   font-size: 20px;
  //   background: #1f2d3d;
  //   p {
  //     -webkit-margin-before: 0;
  //     -webkit-margin-after: 0;
  //     height: $layout-navbar-height;
  //     line-height: $layout-navbar-height;
  //   }
  // }
}
</style>
