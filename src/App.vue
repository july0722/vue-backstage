<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import './assets/styles/_shared.scss';
@import '~normalize.css';
@import '~nprogress/nprogress.css';
</style>
