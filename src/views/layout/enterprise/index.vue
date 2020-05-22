<template>
  <div>
    <!-- 搜索部分 -->
    <el-card>
      <el-form inline :model="searchForm" ref="searchFormRef" label-width="80px">
        <el-form-item label="企业编号" prop="eid">
          <el-input style="width:150px" v-model="searchForm.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input style="width:150px" v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input style="width:150px" v-model="searchForm.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select style="width:150px" v-model="searchForm.status" placeholder="请选择">
            <el-option value="启用"></el-option>
            <el-option value="禁用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" @click="add">+新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 列表和分页部分 -->
    <el-card style="margin-top:15px">
      <el-table stripe :data="enterpriseList" border>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span
              :style="{ color: scope.row.status === 0 ? '#e1251b' : '#00a4ff' }"
            >{{ scope.row.status === 0 ? "禁用" : "启用" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="primary">编辑</el-button>
            <el-button
              :type="scope.row.status === 0 ? 'success' : 'info'"
            >{{scope.row.status === 0 ? '启用' : '禁用'}}</el-button>
            <el-button>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:15px;text-align:center;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "EnterPrise",
  data() {
    return {
      searchForm: {
        eid: "", // 企业编号
        name: "", // 企业名称
        username: "", // 创建者
        status: "" // 状态
      },
      page: 1, //页码
      limit: 2, //页容量
      enterpriseList: [], //table展示所需要的数据
      total: 0 //总条数
    };
  },
  created() {
    this.getEnterpriseListData();
  },
  methods: {
    // 一进入页面就渲染列表
    async getEnterpriseListData() {
      const res = await this.$axios.get("/enterprise/list", {
        params: {
          page: this.page,
          limit: this.limit,
          ...this.searchForm
        }
      });
      // console.log(res);
      if (res.data.code === 200) {
        this.enterpriseList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    // 搜索
    search() {
      this.page = 1;
      this.getEnterpriseListData();
    },
    // 清空
    clear() {
      // 表单重置
      this.$refs.searchFormRef.resetFields();
      this.search();
    },
    // 页容量发送改变
    handleSizeChange(val) {
      this.limit = val;
      this.search();
    },
    // 当前页码发生了改变
    handleCurrentChange(val) {
      this.page = val;
      this.getEnterpriseListData();
    },
    add() {}
  }
};
</script>

<style>
</style>