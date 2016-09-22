<template>
<div class="navbar">
  <el-dropdown :text="$store.state.auth.user.name" type="text" :icon-separate="false">
    <el-dropdown-item>系统设置</el-dropdown-item>
    <el-dropdown-item class="divider" @click.native="handleLogout">退出</el-dropdown-item>
  </el-dropdown>
  <!-- <el-dropdown text="下拉菜单" type="text" :icon-separate="false" @mainclick="handleMainClick()">
    <el-dropdown-item>黄金糕</el-dropdown-item>
  </el-dropdown> -->
</div>
</template>

<script>
import {
  mapActions
} from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    handleLogout() {
      this.logout()
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="scss">@import '../../assets/styles/fn.scss';
.navbar {
    position: fixed;
    height: $globalNavbarHeight;
    background: #324057;
    min-width: 100%;
    z-index: 2;
    box-shadow: 0 2px 3px hsla(0,0%,7%,.1),0 0 0 1px hsla(0,0%,7%,.1);
    .el-dropdown {
        float: right;
        padding: 0 $globalGap*3;
        height: $globalNavbarHeight;
        line-height: $globalNavbarHeight;
    }
}
</style>
