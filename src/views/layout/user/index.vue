<template>
  <div class="user">
    <!-- 卡片布局 -->
    <!-- 搜索部分 -->
    <el-card>
      <!-- :inline = 'true' === inline -->
      <el-form inline :model="userForm" ref="userFormRef" label-width="80px">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select style="width:150px;" v-model="userForm.role_id" placeholder="请选择">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" type="primary">搜索</el-button>
          <el-button @click="clear" type="default">清除</el-button>
          <el-button @click="add" type="primary">+新增用户</el-button>
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
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
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
            <el-button type="primary" @click="editUser(scope.row)">编辑</el-button>
            <el-button
              @click="changeStatus(scope.row.id)"
              :type="scope.row.status === 0 ? 'success' : 'info'"
            >{{scope.row.status === 0 ? '启用' : '禁用'}}</el-button>
            <el-button @click="delteUser(scope.row.id,scope.row.username)" type="default">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:15px;text-align:center">
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
    <!-- 新增或编辑子组件 -->
    <UserEdit ref="userEditRef"></UserEdit>
  </div>
</template>

<script>
import UserEdit from "./user-add-or-updata";
export default {
  name: "UserList",
  components: {
    UserEdit
  },
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
    },
    // 搜索
    search() {
      this.page = 1; // 从第一页开始搜索
      this.getUserData();
    },
    // 清除
    clear() {
      // 方法1：
      // this.userForm.username = "";
      // this.userForm.email = "";
      // this.userForm.role_id = "";

      // 方法2：调用form表单的resetFields方法(对整个表单进行重置，将所有字段值重置为初始值并移除校验结果)
      // 注意：调用resetFields方法，需在el-form-item标签加上prop
      this.$refs.userFormRef.resetFields();
      this.search();
    },
    // 分页条的页容量发生了改变
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // 把页容量设置给每一页的条数
      this.limit = val;
      this.search();
    },
    // 分页条的当前页发生了改变
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.getUserData();
    },
    // 更改当前行的状态
    async changeStatus(id) {
      const res = await this.$axios.post("/user/status", { id });
      // console.log(res);
      if (res.data.code === 200) {
        this.$message({
          type: "success",
          message: "更改状态成功!"
        });
        // 重新查询
        this.search();
      }
    },
    // 删除
    delteUser(id, username) {
      // 提示
      this.$confirm(`确定删除 ${username} 该用户吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.post("/user/remove", { id });
          // console.log(res);
          if (res.data.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
          // 更新数据
          this.getUserData();
        })
        .catch(() => {});
    },
    // 新增用户
    add() {
      // 让新增用户的对话框显示出来
      this.$refs.userEditRef.dialogVisible = true;
      this.$refs.userEditRef.mode = "add";

      // this.$refs.userEditRef.usreForm = {
      //   username: "", //用户名
      //   email: "", //邮箱
      //   phone: "", //电话
      //   role_id: "", //角色 1、超级管理员 2、管理员 3、老师 4、学生
      //   status: "", //状态 1、启用 0、禁用
      //   remark: "" //备注
      // };

      this.$nextTick(() => {
      //   // dialog中的form表单渲染完毕之后，会自动执行该回调函数
      //   this.$refs.userEditRef.$refs.usreFormRef.clearValidate();
      //   // 要想使用 clearValidate 和 resetFields 需要给el-form-item 设置prop
        this.$refs.userEditRef.$refs.userFormRef.resetFields()
      });
    },
    // 修改用户
    editUser(row) {
      console.log(row);
      this.$refs.userEditRef.dialogVisible = true;
      // 深拷贝，把row复制一份，交给userForm。这样就不会指向同一地址(引用类型)
      this.$refs.userEditRef.userForm = JSON.parse(JSON.stringify(row));
      this.$refs.userEditRef.mode = "edit";
      this.$nextTick(() => {
        // 如果第一次点击编辑的时候，也需要等form表单渲染完，才把校验规则去掉
        this.$refs.userEditRef.$refs.userFormRef.clearValidate();
      });
    }
  }
};
</script>

<style>
</style>