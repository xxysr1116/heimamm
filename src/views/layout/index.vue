<template>
  <div class="layout">
    <el-container>
      <el-header class="header">
        <div class="left">
          <i style="font-size: 20px;" class="el-icon-s-fold"></i>
          <img src="@/assets/layout_icon.png" class="marginlr" alt />
          <span class="title">黑马面面</span>
        </div>
        <div class="right">
          <img :src="avatarz" alt />
          <span class="name">{{username}} 欢迎您</span>
          <el-button type="primary">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 按需导入
import {getToken} from "@/utils/token.js";
export default {
  data() {
    return {
      avatarz: "", //用户的头像
      username: ""  //昵称
    };
  },
  methods: {
    async getuserInfoData() {
      const res = await this.$axios.get("/info", {
        headers: {
          token: getToken()
        }
      });
      // console.log(res);
      if (res.data.code === 200) {
        this.avatarz = process.env.VUE_APP_BASEURL + '/' + res.data.data.avatar
        this.username = res.data.data.username
      }
    }
  },
  created() {
    this.getuserInfoData();
  }
};
</script>

<style lang="less">
.layout {
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
}
</style>