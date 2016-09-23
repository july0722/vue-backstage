<template>
<div class="main-sidebar">
  <el-menu default-active="1-1">
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-message"></i>导航一
</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
    </el-submenu>
    <el-menu-item index="2"><i class="el-icon-menu"></i>导航二</el-menu-item>
    <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>
  </el-menu>
</div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">@import '../../assets/styles/fn.scss';
.main-sidebar {
    position: fixed;
    top: $global-navbar-height;
    left: 0;
    bottom: 0;
    width: $global-sidebar-width;
    max-height: 100vh;
    height: 100%;
    z-index: 1;
    background: #fff;
    box-shadow: 0 2px 3px hsla(0,0%,7%,.1),0 0 0 1px hsla(0,0%,7%,.1);
    overflow-y: auto;
    overflow-x: hidden;
    .el-menu {
        border-radius: 0;
        height: 100%;
    }
}
</style>
