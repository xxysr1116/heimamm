<template>
  <div>
      父组件
      <br>
      <br>
      <br>
      <br>
      <child>
          <div style="border:1px solid green;width:100px" slot="title">123456789</div>
          内容
          <div style="border:1px solid red; width:100px" slot="footer">底部</div>
      </child>
  </div>
</template>

<script>
import child from './child'
export default {
    components:{
        child
    }
}
</script>

<style>

</style>