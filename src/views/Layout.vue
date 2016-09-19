<template>
<div>
  <el-row>
    <el-col :span="6">
      <sidebar></sidebar>
    </el-col>
    <el-col :span="18">
      <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
        <router-view class="animated"></router-view>
      </transition>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  components: {
    Sidebar: require('../components/layout/Sidebar.vue')
  },
  data() {
    return {}
  }
}
</script>

<style>

</style>
