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
        <hr class="hrMargin" />
        <el-form-item class="setMargin" label="试题标题" prop="title">
          <quill-editor v-model="questionEditForm.title" :options="{placeholder:'请输入试题标题...'}"></quill-editor>
        </el-form-item>
        <el-form-item :label="typeObj[questionEditForm.type]">
          <!-- 把新增(编辑)组件的questionEditForm对象传过question-type子组件(利用对象是引用类型，在子组件中修改值，父组件也跟着修改。对象地址指向同一内存空间) -->
          <question-type :questionEditForm="questionEditForm"></question-type>
        </el-form-item>
        <hr class="hrMargin" />
        <el-form-item label="解析视频"></el-form-item>
        <el-form-item class="setMargin" label="答案解析" prop="answer_analyze">
          <quill-editor
            v-model="questionEditForm.answer_analyze"
            :options="{placeholder:'请输入答案解析...'}"
          ></quill-editor>
        </el-form-item>
        <hr class="hrMargin" />
        <el-form-item label="试题备注" prop="remark">
          <el-input v-model="questionEditForm.remark"></el-input>
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
// 导入questionType子组件
import questionType from "./question-type";
// 导入vue-quill-edior富文本编辑器相关文件
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "QuestionEdit",
  // 注册vue-quill-edior富文本编辑器
  components: {
    quillEditor,
    questionType
  },
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
        difficulty: "1", //题目难度
        single_select_answer: "", //单选答案
        multiple_select_answer: [], //多选答案
        short_answer: "", //简答答案
        select_options: [
          {
            label: "A",
            text: "shift",
            image: ""
          },
          {
            label: "B",
            text: "pop",
            image: ""
          },
          {
            label: "C",
            text: "splice",
            image: ""
          },
          {
            label: "D",
            text: "slice",
            image: ""
          }
        ]
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
        ],
        title: [
          { required: true, message: "试题标题不能为空", trigger: "change" }
        ],
        answer_analyze: [
          { required: true, message: "答案解析不能为空", trigger: "change" }
        ],
        remark: [
          { required: true, message: "试题备注不能为空", trigger: "blur" }
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
  .hrMargin {
    margin-bottom: 20px;
  }
  .setMargin {
    .el-form-item__content {
      margin-left: 0px !important;
      margin-top: 40px;
    }
  }
  .ql-editor {
    height: 150px;
  }
}
</style>