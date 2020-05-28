<template>
  <div class="questionType">
    <div v-if="questionEditForm.type == 1">
      <div v-for="item in questionEditForm.select_options" :key="item.label" class="item">
        <!-- radio -->
        <el-radio v-model="questionEditForm.single_select_answer" :label="item.label">{{item.label}}</el-radio>
        <!-- input -->
        <el-input v-model="item.text"></el-input>
        <!-- 上传的子组件 -->
      </div>
    </div>
    <div v-if="questionEditForm.type == 2">
      <div v-for="item in questionEditForm.select_options" :key="item.label" class="item">
        <!-- checkbox -->
        <el-checkbox
          v-model="questionEditForm.multiple_select_answer"
          :label="item.label"
        >{{item.label}}</el-checkbox>
        <!-- input -->
        <el-input style="margin-left:15px" v-model="item.text"></el-input>
        <!-- 上传的子组件 -->
      </div>
    </div>
    <div v-if="questionEditForm.type == 3">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="questionEditForm.short_answer"
      ></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionType",
  // 把父组件的questionEditForm对象传值给子组件
  // (在当前组件修改questionEditForm对象的值，那么父组件中的questionEditForm对象相对应的值也修改了。原因是对象是引用类型数据)
  props: ["questionEditForm"],
  data() {
    return {};
  }
};
</script>

<style lang="less">
.questionType {
  .item {
    display: flex;
    align-items: center;
  }
}
</style>