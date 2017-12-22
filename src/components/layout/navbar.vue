<template>
  <div class="navbar" :class="{collapse: $store.state.app.sidebar.collapse}">
    <div @click="toggleSidebar()">
      <i class="el-icon-tickets"></i>
    </div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index" :to="item.path">{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        测试用户
        <i class="el-icon-caret-bottom el-icon-right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item divided>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'navbar',
  computed: {
    ...mapGetters(['breadcrumb'])
  },
  methods: {
    ...mapActions(['toggleSidebar'])
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/_shared.scss';

.navbar {
  position: fixed;
  left: $layout-sidebar-width;
  top: 0;
  right: 0;
  z-index: 10;
  height: $layout-navbar-height;
  border-bottom: $global-border;
  padding: 0 $global-gap*2;
  transition: $--all-transition;
  display: flex;
  align-items: center;
  background: #fff;
  box-sizing: border-box;
  &.collapse {
    left: $layout-sidebar-collapse-width;
  }
}
</style>
