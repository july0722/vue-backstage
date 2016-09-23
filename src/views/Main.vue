<template>
<div class="main">
  <navbar></navbar>
  <sidebar></sidebar>
  <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
    <div class="main-wrapper">
      <router-view class="main-view animated"></router-view>
    </div>
  </transition>
</div>
</template>

<script>
import Navbar from '../components/main/Navbar.vue';
import Sidebar from '../components/main/Sidebar.vue';

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

<style lang="scss">@import '../assets/styles/fn.scss';
.main {
    &-wrapper {
        margin-left: $global-sidebar-width;
        padding: $global-gap*3 + $global-navbar-height $global-gap*3 $global-gap*3;
    }
    &-view {
        padding: $global-gap*3;
        border-radius: $global-border-radius;
        box-shadow: 0 2px 3px hsla(0,0%,7%,.1),0 0 0 1px hsla(0,0%,7%,.1);
    }
}
</style>
