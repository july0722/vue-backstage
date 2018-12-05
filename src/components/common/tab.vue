<template>
  <div class="c-tab">
    <div class="c-tab__toolbar">
      <slot></slot>
    </div>
    <el-tabs type="border-card" v-model="activeTab" @tab-click="onTabClick">
      <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.name" :name="item.code">
        <component
          v-if="activeTab === item.code"
          :is="item.component"
          :code="item.code"
          :index="index"
        ></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import querystring from 'querystring'

export default {
  name: 'c-tab',
  props: {
    tabs: Array
  },
  data() {
    return {
      activeTab: this.$route.params.code
    }
  },
  watch: {
    $route: function(val) {
      this.activeTab = val.params.code
    }
  },
  methods: {
    onTabClick() {
      const query = querystring.stringify(this.$route.query)
      this.$router.push(
        `${this.$route.matched[1].path.split(':code')[0]}${this.activeTab}${
          query === '' ? '' : '?' + query
        }`
      )
    }
  }
}
</script>

<style lang="scss">
@include b(c-tab) {
  padding: 16px;
  height: calc(100% - 32px);
  @include e(toolbar) {
    position: absolute;
    right: 24px;
    z-index: 10;
    top: 22px;
  }
  @include b(el-tabs) {
    @include m(border-card) {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    @include e(content) {
      flex: 1;
      .el-tab-pane,
      [code] {
        height: 100%;
      }
    }
  }
  // @include b(el-tabs) {
  //   @include e(header) {
  //     margin: 0;
  //     padding: 0 24px;
  //   }
  //   @include e(content) {
  //     padding: 18px 24px;
  //     font-size: 14px;
  //   }
  // }
  // .el-tabs__nav-wrap::after {
  //   display: none;
  // }

  // .el-tabs__item {
  //   font-size: 16px;
  //   line-height: 16px;
  //   height: 28px;
  //   color: #333;
  //   &.is-active {
  //     // color: $theme-color;
  //   }
  // }
  // .el-tabs__nav-next,
  // .el-tabs__nav-prev {
  //   line-height: 28px;
  // }
}
</style>
