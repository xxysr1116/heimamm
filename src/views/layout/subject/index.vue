<template>
  <div>
    <!-- 搜索部分 -->
    <el-card>
      <el-form inline :model="searchForm" ref="searchFormRef" label-width="80px">
        <el-form-item label="学科编号" prop="rid">
          <el-input style="width:150px" v-model="searchForm.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科姓名" prop="name">
          <el-input style="width:150px" v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input style="width:150px" v-model="searchForm.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select style="width:150px" v-model="searchForm.status" placeholder="请选择">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" @click="add">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容与分页部分 -->
    <el-card style="margin-top:15px">
      <el-table :data="subjectList" border stripe>
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span
              :style="{color:scope.row.status === 0 ? 'red' : 'green'}"
            >{{scope.row.status === 0 ? '禁用' : '启用'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="primary">编辑</el-button>
            <el-button
              @click="changeStatus(scope.row.id)"
              :type="scope.row.status === 0 ? 'success' : 'info'"
            >{{scope.row.status === 0 ? '启用' : '禁用'}}</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:'15px';text-align:center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="2"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <subject-edit ref="subjectEditRef"></subject-edit>
  </div>
</template>

<script>
import subjectEdit from "@/views/layout/subject/subject-add-or-updata";
export default {
  name: "SubjectList",
  components: {
    subjectEdit
  },
  data() {
    return {
      searchForm: {
        rid: "", //学科编号
        name: "", //学科名称
        username: "", //创建者
        status: "" //状态
      },
      page: 1, //页码
      limit: 2, //页容量
      subjectList: [], //table展示所需要的数据
      total: 0 //总页码
    };
  },
  created() {
    this.getSubectListData();
  },
  methods: {
    async getSubectListData() {
      const res = await this.$axios.get("/subject/list", {
        params: {
          page: this.page,
          limit: this.limit,
          ...this.searchForm
        }
      });
      // console.log(res);
      if (res.data.code === 200) {
        this.subjectList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    search() {
      this.page = 1;
      this.getSubectListData();
    },
    clear() {
      // 表单重置
      this.$refs.searchFormRef.resetFields();
      this.search();
    },
    add() {
      this.$refs.subjectEditRef.mode = "add";
      this.$refs.subjectEditRef.dialogVisible = true;
      // 手动清空新增学科的内容
      this.$refs.subjectEditRef.subjectForm = {
        rid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简称
        intro: "", //学科简介
        remark: "" //学科备注
      };
    },
    async changeStatus(id) {
      const res = await this.$axios.post("/subject/status", { id });
      if (res.data.code === 200) {
        this.$message({
          type: "success",
          message: "更改状态成功!"
        });
        // 刷新
        this.getSubectListData();
      }
    },
    del(id) {
      // console.log(id);
      this.$confirm("确定要删除改数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.post("/subject/remove", { id });
          if (res.data.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            // 刷新
            this.search();
          }
        })
        .catch(() => {});
    },
    // 页容量发生改变
    handleSizeChange(val) {
      this.limit = val;
      this.search();
    },
    // 页码发生改变
    handleCurrentChange(val) {
      this.page = val;
      this.getSubectListData();
    },
    edit(row) {
      const { id, rid, name, short_name, intro, remark } = row;
      this.$refs.subjectEditRef.subjectForm = {
        id,
        rid,
        name,
        short_name,
        intro,
        remark
      };
      this.$refs.subjectEditRef.mode = "edit";
      this.$refs.subjectEditRef.dialogVisible = true;
    }
  }
};
</script>

<style>
</style>