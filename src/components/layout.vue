<template>
  <el-container class="layout">
    <el-header>
      <h1>system</h1>
      <div>
        <el-dropdown>
          <div class="el-dropdown-link">
            <span>{{ user }}</span>
            <i class="el-icon-arrow-down"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="240px">
        <el-menu ref="menu" router @select="onSelect">
          <template v-for="menu in menus">
            <el-submenu v-if="menu.children" :index="menu.name" :key="menu.name">
              <template slot="title">{{ menu.name }}</template>
              <el-menu-item
                v-for="sub in menu.children"
                :key="sub.name"
                :index="sub.url"
              >{{ sub.name }}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else :key="menu.name" :index="menu.url">
              <i class="el-icon-menu"></i>
              <span slot="title">{{menu.name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-main v-loading="loading">
        <router-view class="view"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/mutation-types'

export default {
  name: 'layout',
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState({
      path: state => state.auth.path,
      user: state => state.auth.user,
      menus: state => state.auth.menus
    })
  },
  created() {
    this.$root.$on(
      'loading',
      loading =>
        (this.loading = loading === undefined ? !this.loading : loading)
    )
  },
  beforeDestroy() {
    this.$root.$off('loading')
  },
  methods: {
    ...mapActions(['logout']),
    onSelect(index) {
      this.$store.commit(types.RECORD_AUTH_PATH, index)
    }
  }
}
</script>

<style lang="scss">
.layout {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  .el-loading-parent--relative {
    overflow: hidden;
  }
  > .el-header {
    font-size: 12px;
    padding: 0 24px;
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #324057;
    h1 {
      color: #fff;
      font-size: 22px;
      line-height: 22px;
    }
    .el-dropdown {
      color: #fff;
    }
    .el-icon-arrow-down {
      margin-left: 4px;
    }
  }
  > .el-container {
    > .el-main {
      padding: 0;
      position: relative;
      background: #f2f2f2;
    }
    > .el-aside {
      overflow-x: hidden;
      .el-menu {
        border-right: none;
        &-item.is-active {
          // background-color: #f2f2f2;
        }
      }
    }
  }
}
</style>
