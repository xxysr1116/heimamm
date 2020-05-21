<template>
  <div class="user">
    <!-- 卡片布局 -->
    <!-- 搜索部分 -->
    <el-card>
      <el-form inline :model="userForm" ref="userFormRef" label-width="80px">
        <el-form-item label="用户名称">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select style="width:150px;" v-model="userForm.role_id" placeholder="请选择">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button type="default">清除</el-button>
          <el-button type="primary">+新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容部分 -->
    <el-card style="margin-top:20px">
      <el-table stripe :data="userList" style="width: 100%">
        <!-- type="index" 内部有type属性，自定义索引 -->
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span style="color:#e1251b" v-if="scope.row.status === 0">禁用</span>
            <span style="color:#00a4ff" v-if="scope.row.status === 1">启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="primary">编辑</el-button>
            <el-button :type="scope.row.status === 0 ? 'success' : 'info'">{{scope.row.status === 0 ? '启用' : '禁用'}}</el-button>
            <el-button type="default">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name:'UserList',
  data() {
    return {
      userForm: {
        username: "", //昵称
        email: "", //邮箱
        role_id: "" //角色数字 1、超级管理员 2、管理员 3、老师 4、学生
      },
      page: 1, // 查询时候的页码
      limit: 2, // 查询时候的页容量(每页查询多少条)
      total: 0, //总条数
      userList: [] //保存请求回来的数据
    };
  },
  created() {
    // 获取用户列表数据，用于内容展示
    this.getUserData();
  },
  methods: {
    async getUserData() {
      const res = await this.$axios.get("/user/list", {
        params: {
          page: this.page,
          limit: this.limit,
          ...this.userForm, // 展开运算符 相当于一下注释的
          // username:this.userForm.username,
          // email:this.userForm.email,
          // role_id:this.userForm.role_id
          total: this.total
        }
      });
      // console.log(res.data);
      if (res.data.code === 200) {
        this.userList = res.data.data.items;
        // 获取总条数
        this.total = res.data.data.pagination.total;
      }
    }
  }
};
</script>

<style>
</style>