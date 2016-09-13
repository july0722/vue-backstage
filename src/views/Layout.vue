<template>
<div>
  <h1>{{ msg }}</h1>
  <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
    <router-view class="animated"></router-view>
  </transition>
</div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Layout'
    }
  }
}
</script>

<style>
</style>
