<template>
  <div>
    测试 v-model
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />

    <!--双向数据绑定：v-model 其实就是一个语法糖，它相当于是 :value 和 @input 构成的 -->
    <!-- <input type="text" v-model="name"> -->

    <!-- <input type="text" :value="name"> -->
    <!-- 只要输入的值变化了就会触发input，@input 一般用于监听事件 -->
    <input type="text" :value="name" @input="changeValue" />
  </div>
</template>

<script>
export default {
  name: "Text-VModel",
  // 模型     视图(看得见的)
  data() {
    return {
      name: "张三"
    };
  },
  // created() {
  //     this.changeValue();
  // },
  methods: {
    changeValue(e) {
      // console.log(e);
      this.name = e.target.value;
    }
  }
};
</script>

<style>
</style>