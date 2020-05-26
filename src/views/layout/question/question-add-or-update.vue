<template>
  <div class="questionEdit">
    <el-dialog :visible.sync="dialogVisible" fullscreen>
      <div slot="title" class="title">{{mode === 'add' ? '新增试题' : '修改试题'}}</div>
      <el-form
        class="form"
        label-position="left"
        :model="questionEditForm"
        :rules="rules"
        ref="questionEditFormRef"
        label-width="120px"
      >
        <el-form-item label="学科" prop="subject">
          <el-select class="selectWidth" v-model="questionEditForm.subject" placeholder="请选择学科">
            <el-option
              v-for="item in subjectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select class="selectWidth" v-model="questionEditForm.step" placeholder="请选择阶段">
            <el-option v-for="(value,name) in stepObj" :key="name" :label="value" :value="name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <el-select class="selectWidth" v-model="questionEditForm.enterprise" placeholder="请选择企业">
            <el-option
              v-for="item in enterprise"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!--需设置 :props="{value:'label'}"，不设置默认value:'name'(编码) -->
        <el-form-item label="城市" prop="city">
          <el-cascader
            size="large"
            v-model="questionEditForm.city"
            :options="options"
            :props="{value:'label'}"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-radio-group v-model="questionEditForm.type">
            <el-radio v-for="(value, name) in typeObj" :key="name" :label="name">{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-radio-group v-model="questionEditForm.difficulty">
            <el-radio v-for="(value, name) in difficultyObj" :key="name" :label="name">{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button>取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// 导入中国省市区级联数据
import { regionData } from "element-china-area-data";
export default {
  name: "QuestionEdit",
  // 父子组件传值(把父组件已经获取的数据传给子组件)
  props: {
    subjectList: Array,
    enterprise: Array,
    stepObj: Object, //阶段 1.初级 2.中级 3.高级
    typeObj: Object, //题型 1.单选 2.多选 3.简答
    difficultyObj: Object //题目难度 1.简单 2.一般 3.困难
  },
  //   created() {
  //     console.log(regionData);
  //   },
  data() {
    return {
      mode: "", //模式 新增(add) & 编辑(edit)
      dialogVisible: false, // 控制dialog的显示及隐藏
      options: regionData,
      questionEditForm: {
        // 这个里面的所有值，将来是传递给服务器的
        subject: "", //学科
        step: "", //阶段
        enterprise: "", //企业
        city: [], //城市
        type: "1",
        difficulty: "1" //题目难度
      },
      rules: {
        subject: [{ required: true, message: "请选择学科", trigger: "change" }],
        step: [{ required: true, message: "请选择阶段", trigger: "change" }],
        enterprise: [
          { required: true, message: "请选择企业", trigger: "change" }
        ],
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        type: [{ required: true, message: "请选择题型", trigger: "change" }],
        difficulty: [
          { required: true, message: "请选择难度", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submit() {}
  }
};
</script>

<style lang="less">
.questionEdit {
  .title {
    color: #fff;
    padding-left: 15px;
    height: 54px;
    line-height: 54px;
    background-color: #04bcfa;
  }
  .el-dialog__header {
    padding: 0px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .form {
    width: 832px;
    margin: 0 auto;
  }
  .selectWidth {
    width: 300px;
  }
}
</style>