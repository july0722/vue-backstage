<template>
<div class="layout">
  <navbar></navbar>
  <sidebar></sidebar>
  <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
    <div class="layout-main">
      <router-view class="layout-container animated"></router-view>
    </div>
  </transition>
</div>
</template>

<script>
import Navbar from '../components/layout/Navbar.vue';
import Sidebar from '../components/layout/Sidebar.vue';

export default {
  components: {
    Navbar,
    Sidebar
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.layout {
    &-main {
        margin-left: 224px;
        padding: 64px + 24px 24px 24px;
    }
    &-container {
        padding: 24px;
        border-radius: 5px;
        box-shadow: 0 2px 3px hsla(0,0%,7%,.1),0 0 0 1px hsla(0,0%,7%,.1);
    }
}
</style>
