<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <transition
      mode="out-in"
      enter-active-class="fadeIn"
      leave-active-class="fadeOut"
      appear>
      <router-view class="animated"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello Vue 2.0!'
    }
  }
}
</script>

<style>
@import '~animate.css';
body {
  font-family: Helvetica, sans-serif;
}
</style>
