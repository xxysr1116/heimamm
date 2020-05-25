<template>
  <div>
    <!-- 搜索部分 -->
    <el-card>
      <el-form inline :model="questionForm" ref="questionFormRef" label-width="40px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="学科">
              <el-select v-model="questionForm.subject" placeholder="请选择">
                <el-option
                  v-for="item in subjectList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="阶段">
              <el-select v-model="questionForm.step" placeholder="请选择">
                <!-- v-for可以遍历数组，也可以遍历对象 -->
                <el-option v-for="(value,name) in stepObj" :key="name" :label="value" :value="name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业">
              <el-select v-model="questionForm.enterprise" placeholder="请选择">
                <el-option
                  v-for="item in enterprise"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="题型">
              <el-select v-model="questionForm.type" placeholder="请选择">
                <el-option
                  v-for="(value, name) in typeObj"
                  :key="name"
                  :label="value"
                  :value="name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="难度">
              <el-select v-model="questionForm.difficulty" placeholder="请选择">
                <el-option
                  v-for="(value, name) in difficultyObj"
                  :key="name"
                  :label="value"
                  :value="name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="作者">
              <el-input style="width:217px" v-model="questionForm.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select v-model="questionForm.type" placeholder="请选择">
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="日期">
              <el-date-picker v-model="questionForm.create_date" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="标题">
              <el-input style="width:548px" v-model="questionForm.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button>清除</el-button>
              <el-button type="primary" @click="add">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 内容与分页部分 -->
    <el-card style="margin-top:15px">
      <el-table :data="questionList" border stripe>
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="title" label="题目" width="250"></el-table-column>
        <el-table-column prop="step" label="学科.阶段"></el-table-column>
        <el-table-column prop="type" label="题型"></el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span
              :style="{color: scope.row.status === 0 ? 'red' : 'green'}"
            >{{scope.row.status === 0 ? '禁用' : '启用'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="primary">编辑</el-button>
            <el-button
              :type="scope.row.status === 0 ? 'success' : 'info'"
            >{{scope.row.status === 0 ? '启用' : '禁用'}}</el-button>
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Question",
  data() {
    return {
      subjectList: [],
      enterprise: [],
      stepObj: { 1: "初级", 2: "中级", 3: "高级" }, //阶段
      typeObj: { 1: "单选", 2: "多选", 3: "简答" }, //题型
      difficultyObj: { 1: "简单", 2: "一般", 3: "困难" }, //难度
      questionForm: {
        title: "", //标题名称
        subject: "", //学科id
        enterprise: "", //企业id
        type: "", //题目类型:1.(单选) 2.(多选) 3.(简答)
        step: "", //题目阶段:1.(初级) 2.(中级) 3.(高级)
        username: "", //作者
        status: "", //状态 :禁用(0) 启用(1)
        difficulty: "", //题目难度:1.(简单) 2.(一般) 3.(困难)
        create_date: "" //创建日期
      },
      page: 1, //页码
      limit: 2, //页容量
      questionList: [], //
      total: 0 //总页码
    };
  },
  created() {
    this.getSubjectListData();
    this.getEnterpriseData();
    this.getQuestionListData();
  },
  methods: {
    async getSubjectListData() {
      const res = await this.$axios.get("/subject/list");
      // console.log(res);
      if (res.data.code === 200) {
        this.subjectList = res.data.data.items;
      }
    },
    async getEnterpriseData() {
      const res = await this.$axios.get("/enterprise/list");
      if (res.data.code === 200) {
        this.enterprise = res.data.data.items;
      }
    },
    async getQuestionListData() {
      const res = await this.$axios.get("/question/list", {
        params: {
          page: this.page,
          limit: this.limit,
          ...this.questionForm
        }
      });
      console.log(res);
      if (res.data.code === 200) {
        this.questionList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    search() {
      this.page = 1;
      this.getQuestionListData();
    },
    add() {}
  }
};
</script>

<style>
</style>