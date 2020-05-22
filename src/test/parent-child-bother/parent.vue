<template>
  <div style="width:1200px;height:600px;border:1px solid red;">
    父组件
    <br />
    中午我们吃 {{foodName}} ，价格是 {{foodPrice}}
    <br />
    <br />
    <div style="margin-left:20px;float:left;width:400px;height:500px;border:1px solid green;">
      <child1 :list="peopleList" @sendFood="getFoodValue"></child1>
      <!-- <child1 :list='peopleList'></child1> -->
      <!-- 如果没给值，就默认传过来的子组件的值 -->
      <!-- <child1></child1> -->
    </div>
    <div style="margin-right:20px;float:right;width:400px;height:500px;border:1px solid blue;">
      <child2></child2>
    </div>
  </div>
</template>

<script>
import Child1 from "./child1";
import Child2 from "./child2";
export default {
  name: "parent",
  components: {
    Child1,
    Child2
  },
  data() {
    return {
      foodName: "",
      foodPrice: "",
      peopleList: [
        { name: "王思琪", age: "18" },
        { name: "郭德纲", age: "98" }
      ]
    };
  },
  methods: {
    getFoodValue(obj) {
      // console.log("parnet", obj);
      this.foodName = obj.foodName;
      this.foodPrice = obj.foodPrice;
    }
  }
};
</script>

<style>
</style>