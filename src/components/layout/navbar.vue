<template>
  <div class="navbar">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="'/dashboard'">首页</el-breadcrumb-item>
      <template v-if="$route.path !== '/dashboard' && permission">
        <el-breadcrumb-item>{{permission.name}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="path">{{permission.children.find(c => c.path === path).name}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="/\d+/.test($route.path)">{{$route.path.includes('-1') ? '新增' : '编辑'}}</el-breadcrumb-item>
      </template>
      <template v-if="$route.name">
        <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        {{currentUser.username}}
        <i class="el-icon-caret-bottom el-icon-right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="$router.push('/password')">修改密码</el-dropdown-item>
        <el-dropdown-item class="divider" @click.native="$router.push('/logout')">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  name: 'navbar',
  computed: {
    ...mapGetters([
      'currentUser',
      'currentPermissions'
    ]),
    path() {
      let _path = this.$route.path
      if (this.$route.matched[1].path.includes('/:id')) {
        _path = this.$route.matched[1].path.split('/:id')[0]
      }
      return _path
    },
    permission() {
      return this.currentPermissions.find(p => p.children.find(c => c.path === this.path))
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/index.scss';
.navbar {
  background: #fff;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: $layout-sidebar-width;
  right: 0;
  height: $layout-navbar-height;
  line-height: $layout-navbar-height;
  z-index: 2;
  border-bottom: 1px solid $global-border-color;
  padding: 0 $global-gap*2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-icon-caret-bottom:before {
    line-height: $layout-navbar-height;
  }
  .el-dropdown-item a {
    display: block;
  }
}
</style>
