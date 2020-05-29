<template>
  <div>
      子组件
      <br>
      <br>
      <br>
      <br>
      传递过来的值：{{value}}
      <br>
      <br>
      <br>
      <button @click="changeValue">更改url</button>
  </div>
</template>

<script>
export default {
    // 接收从父组件那传过来的value(也就是url)
    props:['value'],
    methods: {
      changeValue(){
        // 触发input事件(这里只能写input，因为v-model = :value + @input)
        // 参数是更改的url，参数是可选的。
        this.$emit('input','www.jd.com');
      }
    },
}
</script>

<style>

</style>