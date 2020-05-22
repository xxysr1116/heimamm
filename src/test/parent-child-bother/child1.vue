<template>
  <div>
    子组件1
    <ul>
      <li v-for="(item, index) in list" :key="index">{{item.name}} ---- {{item.age}}</li>
    </ul>

    <button @click="sendValueToParent">子组件传值父组件</button>
    <br />
    <br />
    <button @click="sendValueToChild2">兄弟组件传值</button>
  </div>
</template>

<script>
import bus from "./bus";
export default {
  name: "child1",
  data() {
    return {};
  },
  props: ["list"],
  // 带有默认值的对象
  // props: {
  //   list: {
  //     tyoe: Array,
  //     default() {
  //       return [
  //         { name: "郭富城", age: "58" },
  //         { name: "张学友", age: "18" }
  //       ];
  //     }
  //   }
  // },
  methods: {
    /**
     * 参数1：自定义事件的名字，可以随意写，但是不要写系统已经存在的时间，比如 click
     * 参数2：就是你要传递给父组件的值（任意类型）
     */
    sendValueToParent() {
      this.$emit("sendFood", { foodName: "红烧肉", foodPrice: 50 });
    },
    sendValueToChild2() {
      bus.$emit("sendDrinks", { name: "草莓啵啵", price: 35 });
    }
  }
};
</script>

<style>
</style>