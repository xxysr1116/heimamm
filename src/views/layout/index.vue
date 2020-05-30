<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="left">
        <i @click="isCollapse = !isCollapse " style="font-size: 20px;" class="el-icon-s-fold"></i>
        <img src="@/assets/layout_icon.png" class="marginlr" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img :src="avatarz" alt />
        <span class="name">{{username}} 欢迎您</span>
        <el-button @click="logout" type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <!-- router ：是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
        <el-menu
          router
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
        <!-- 实际开发中，后台会根据你登录用户是哪个角色，返回与之对应的权限列表 -->
        <!-- 从vuex仓库拿到用户角色，判断roles数组是否包含用户角色 -->
        <!-- 因为现在的接口后台没有给我们权限表，所以我们就利用路由的元信息，做一个简单的前端权限 -->
          <el-menu-item
            v-show="item.meta.roles.includes($store.getters.getUserInfo.role)"
            v-for="item in $router.options.routes[2].children"
            :key="item.path"
            :index="item.meta.fullPath"
          >
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.title}}</span>
          </el-menu-item>

          <!-- <el-menu-item index="/layout/welcome">
            <i class="el-icon-date"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="/layout/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据预览</span>
          </el-menu-item>
          <el-menu-item index="/layout/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>-->
        </el-menu>
      </el-aside>
      <el-main class="main" style="background-color:#e8e9ec;">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 按需导入
import { getToken, removeToken } from "@/utils/token.js";
export default {
  data() {
    return {
      avatarz: "", //用户的头像
      username: "", //昵称
      isCollapse: false, //是否收起折叠菜单
      defaultActive: "" // 菜单选中的值
    };
  },
  methods: {
    // 获取用户信息
    async getuserInfoData() {
      const res = await this.$axios.get(
        "/info"
        // 设置请求头，
        // {headers: {token: getToken()}}
      );
      // console.log(res);
      if (res.data.code === 200) {
        this.avatarz = process.env.VUE_APP_BASEURL + "/" + res.data.data.avatar;
        this.username = res.data.data.username;

        // 把数据保存到仓库中
        // 触发 mutations中的方法
        this.$store.commit("setUserInfo", res.data.data);
      }
    },

    // 退出
    logout() {
      this.$confirm("确定退出吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.get("/logout");
          if (res.data.code === 200) {
            // 删除token
            removeToken();
            // 跳转到登录页
            this.$router.push("/login");
          }
        })
        .catch(() => {});
    }
  },
  created() {
    // this.$router 相当于一个全局的路由器对象，包含了很多属性和对象（比如 history 对象），任何页面都可以调用其 push(), replace(), go() 等方法。
    // this.$route 表示当前路由对象，每一个路由都会有一个 route 对象，是一个局部的对象，可以获取对应的 name, path, params, query 等属性。
    this.defaultActive = this.$route.fullPath;
    // console.log(this.defaultActive);
    this.getuserInfoData();
    // console.log(this.$route);
    // console.log(this.$router);
  }
};
</script>

<style lang="less">
.layout {
  height: 100%;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f3f3f3;
    .left {
      display: flex;
      align-items: center;
      .marginlr {
        margin-left: 10px;
        margin-right: 10px;
      }
      .title {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        margin-right: 9px;
        border-radius: 50%;
      }
      .name {
        margin-right: 38px;
      }
    }
  }
  .el-menu {
    border-right: solid 0px #e6e6e6;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: #fff;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>