<template>
  <div id="app">
    <!-- 路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:'app'
}
</script>

<style lang="less">
/* 以下两种方式都可以 */
  /* @import './styles/base.css'; */
  @import url('~@/styles/base.css');
</style>
