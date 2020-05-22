<template>
  <div>
      子组件2
      <br>
      我想喝 {{name}} ，它的价格是 {{price}}
  </div>
</template>

<script>
import bus from './bus'
export default {
  data() {
    return {
      name:'',
      price:''
    }
  },
  created() {
     bus.$on('sendDrinks',obj=>{
      //  这个地方要使用箭头函数，因为里面要访问this
      this.name = obj.name
      this.price = obj.price
     })
  },
}
</script>

<style>

</style>