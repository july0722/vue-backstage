<template>
  <div class="error">
    <img src="../../../assets/images/error.jpg">
  </div>
</template>

<script>
export default {
  name: 'error',
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
