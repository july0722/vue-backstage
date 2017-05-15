<template>
  <div class="sidebar">
    <el-menu :router="true" :default-active="currentRouter">
      <el-submenu v-if="menu1.children" v-for="(menu1, index) in currentMenu" :key="index" :index="menu1.children[0].path">
        <template slot="title">
          <i :class="`el-icon-${menu1.icon}`"></i>{{menu1.name}}</template>
        <el-menu-item v-for="(menu2, index) in menu1.children" :key="index" :index="menu2.path">{{menu2.name}}</el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="menu1.path">
        <i :class="`el-icon-${menu1.icon}`"></i>{{menu1.name}}</el-menu-item>
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
      'currentMenu'
    ])
  },
  data() {
    return {
      currentRouter: this.$router.history.current.fullPath
    }
  },
  methods: {}
}
</script>

<style lang="scss">
@import '../../assets/styles/index.scss';
.sidebar {
  position: fixed;
  top: $global-navbar-height;
  left: 0;
  bottom: 0;
  width: $global-sidebar-width;
  max-height: 100vh;
  height: 100%;
  z-index: 1;
  background: #fff;
  box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
  overflow-y: auto;
  overflow-x: hidden;
  .el-menu {
    border-radius: 0;
    height: 100%;
  }
}
</style>
