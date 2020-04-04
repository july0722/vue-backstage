<template>
  <div class="error"><img  /></div>
</template>

<route-meta>
{
  "title": "错误页"
}
</route-meta>

<script>
export default {
  name: 'error'
}
</script>

<style lang="scss">
.error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
