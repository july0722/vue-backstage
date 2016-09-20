<template>
<div class="layout">
  <headerbar></headerbar>
  <sidebar></sidebar>
  <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
    <div class="layout-main">
      <router-view class="layout-container animated"></router-view>
    </div>
  </transition>
</div>
</template>

<script>
export default {
  components: {
    Headerbar: require('../components/layout/Header.vue'),
    Sidebar: require('../components/layout/Sidebar.vue')
  },
  data() {
    return {}
  }
}
</script>

<style lang="sass" scoped>
.layout {
    &-main {
        background: #ececec;
        margin-left: 224px;
        padding-top: 64px;
    }
    &-container {
        background: transparent;
        padding: 24px;
    }
}
</style>
