<template>
  <div>
    <!-- 搜索部分 -->
    <el-card>
      <el-form inline :model="questionForm" ref="questionFormRef" label-width="40px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="学科" prop="subject">
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
            <el-form-item label="阶段" prop="step">
              <el-select v-model="questionForm.step" placeholder="请选择">
                <!-- v-for可以遍历数组，也可以遍历对象 -->
                <el-option v-for="(value,name) in stepObj" :key="name" :label="value" :value="name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业" prop="enterprise">
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
            <el-form-item label="题型" prop="type">
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
            <el-form-item label="难度" prop="difficulty">
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
            <el-form-item label="作者" prop="username">
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
            <el-form-item label="日期" prop="create_date">
              <el-date-picker v-model="questionForm.create_date" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="标题" prop="title">
              <el-input style="width:548px" v-model="questionForm.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="clear">清除</el-button>
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
        <el-table-column prop="title" width="250">
          <!-- 需自定义：作用域插槽 + v-html -->
          <template slot-scope="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column prop="step" label="学科.阶段" :formatter="formatterType">
          <!-- 方法1：需自定义：作用域插槽 -->
          <!-- <template slot-scope="scope">
            <span>{{scope.row.subject_name}}.{{stepObj[scope.row.step]}}</span>
          </template>-->
        </el-table-column>
        <el-table-column label="题型">
          <!-- 需自定义：作用域插槽 -->
          <template slot-scope="scope">
            <!--  直接这样写最直接 -->
            <span>{{typeObj[scope.row.type]}}</span>
            <!-- 使用调用方法的形式，可以：既可以接收参数，也可以获取到this -->
            <!-- <span>{{formatType(scope.row.type)}}</span> -->
            <!-- 过滤器发现不好使: 过滤器中使用this发现是undefined -->
            <!-- {{scope.row.type | formatType}} -->
            <!-- 计算属性不好使: 无法传递及接收参数 -->
            <!-- {{formatType}} -->
          </template>
        </el-table-column>
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
              @click="changeStatus(scope.row.id)"
              :type="scope.row.status === 0 ? 'success' : 'info'"
            >{{scope.row.status === 0 ? '启用' : '禁用'}}</el-button>
            <el-button @click="del(scope.row.id)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:15px;text-align:center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <question-edit
      ref="questionEditRef"
      :subjectList="subjectList"
      :enterprise="enterprise"
      :stepObj="stepObj"
      :typeObj="typeObj"
      :difficultyObj="difficultyObj"
    ></question-edit>
  </div>
</template>

<script>
import questionEdit from "./question-add-or-update";
export default {
  name: "Question",
  components: {
    questionEdit
  },
  data() {
    return {
      subjectList: [], //学科列表
      enterprise: [], //企业列表
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
    // 获取所有学科列表
    this.getSubjectListData();
    // 获取所有企业列表
    this.getEnterpriseData();
    // 获取题库列表数据
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
      // console.log(res);
      if (res.data.code === 200) {
        this.questionList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    // formatType(val) {
    //   return this.typeObj[val]
    // },
    // 搜索
    search() {
      this.page = 1;
      this.getQuestionListData();
    },
    // 清除
    clear() {
      // 清空数据
      this.$refs.questionFormRef.resetFields();
      this.search();
    },
    // 格式化题型
    formatterType(row) {
      return row.subject_name + "." + this.stepObj[row.step];
    },
    // 页容量发生改变
    handleSizeChange(val) {
      this.limit = val;
      // 刷新
      this.search();
    },
    // 页码发生改变
    handleCurrentChange(val) {
      this.page = val;
      this.getQuestionListData();
    },
    async changeStatus(id) {
      const res = await this.$axios.post("/question/status", { id });
      if (res.data.code === 200) {
        this.$message({
          message: "更改状态成功!",
          type: "success"
        });
      }
      // 刷新当前页
      this.getQuestionListData();
    },
    del(id) {
      this.$confirm("确定删除改数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.post("/question/remove", { id });
          if (res.data.code === 200) {
            this.$message({
              message: "删除成功!",
              type: "success"
            });
          }
          // 刷新
          this.search();
        })
        .catch(() => {});
    },
    add() {
      this.$refs.questionEditRef.mode = "add";
      this.$refs.questionEditRef.dialogVisible = true;
    }
    // filters: {
    //   formatType(val) {
    //     return this.typeObj[val]
    //   }
    // }
    // computed: {
    //   formatType(val){
    //     console.log('...val...',val)
    //     return 'test'
    //   }
    // }
  }
};
</script>

<style>
</style>