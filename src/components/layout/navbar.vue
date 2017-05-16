<template>
  <div class="navbar">
    <el-dropdown>
      <span class="el-dropdown-link">
        管理员
        <i class="el-icon-caret-bottom el-icon-right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <router-link to="/password">修改密码</router-link>
        </el-dropdown-item>
        <el-dropdown-item class="divider">
          <router-link to="/logout">退出</router-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
// import {
//   mapGetters
// } from 'vuex'

export default {
  name: 'navbar',
  // computed: {
  //   ...mapGetters([
  //     'currentUser'
  //   ])
  // },
  data() {
    return {

    }
  },
  methods: {}
}
</script>

<style lang="scss">
@import '../../assets/styles/index.scss';
.navbar {
  position: fixed;
  height: $layout-navbar-height;
  background: #324057;
  min-width: 100%;
  z-index: 2;
  .el-dropdown {
    color: #fff;
    float: right;
    padding: 0 $global-gap*3;
    height: $layout-navbar-height;
    line-height: $layout-navbar-height;
  }
  .el-icon-caret-bottom:before {
    line-height: $layout-navbar-height;
  }
  .el-dropdown-item a {
    display: block;
  }
}
</style>
