<template>
<div class="main-navbar">
  <el-dropdown :text="currentUser.name" type="text" :icon-separate="false">
    <el-dropdown-item>系统设置</el-dropdown-item>
    <el-dropdown-item class="divider">
      <router-link to="/logout">退出</router-link>
    </el-dropdown-item>
  </el-dropdown>
  <!-- <el-dropdown text="下拉菜单" type="text" :icon-separate="false" @mainclick="handleMainClick()">
    <el-dropdown-item>黄金糕</el-dropdown-item>
  </el-dropdown> -->
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  data() {
    return {

    }
  },
  methods: {}
}
</script>

<style lang="scss">@import '../../assets/styles/fn.scss';
.main-navbar {
    position: fixed;
    height: $global-navbar-height;
    background: #324057;
    min-width: 100%;
    z-index: 2;
    box-shadow: 0 2px 3px hsla(0,0%,7%,.1),0 0 0 1px hsla(0,0%,7%,.1);
    .el-dropdown {
        float: right;
        padding: 0 $global-gap*3;
        height: $global-navbar-height;
        line-height: $global-navbar-height;
    }
    .el-dropdown-item a {
        display: block;
    }
}
</style>
