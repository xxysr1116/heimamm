<template>
  <div>
      我说父组件
      <br>
      <br>
      <br>
      <Child style="border:1px solid red; width:200px">
          我是子组件
          <img src="../../assets/avatar.png" alt="">
      </Child>
  </div>
</template>

<script>
import Child from '@/test/slot1/child'
export default {
    components:{
        Child
    }
}
</script>

<style>

</style>