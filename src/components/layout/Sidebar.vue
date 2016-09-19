<template>
<div class="sidebar">
  <el-menu default-active="1-1" @open="handleopen" @close="handleclose">
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

<style lang="sass" scoped>
.sidebar {
    // position: fixed;
    // top: 50px;
    // left: 0;
    // bottom: 0;
    // padding: 20px 0 50px;
    // width: 180px;
    // min-width: 45px;
    // max-height: 100vh;
    // height: 100%;
    // z-index: 1023;
    // background: #fff;
    // box-shadow: 0 2px 3px hsla(0,0%,7%,.1),0 0 0 1px hsla(0,0%,7%,.1);
    // overflow-y: auto;
    // overflow-x: hidden;
}
</style>
