<template>
  <el-dialog class="register" center width="600px" :visible.sync="dialogVisible">
    <div class="title" slot="title">用户注册</div>
    <el-form label-width="80px" :model="registerForm">
      <el-form-item label="昵称">
        <el-input v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="registerForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="registerForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="图形码">
        <el-row :gutter="16">
          <el-col :span="16">
            <el-input></el-input>
          </el-col>
          <el-col :span="7">
            <img class="captcha" src="http://127.0.0.1/heimamm/public/captcha?type=login" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码">
        <el-row :gutter="16">
          <el-col :span="16">
            <el-input v-model="registerForm.rcode"></el-input>
          </el-col>
          <el-col :span="7">
            <el-button>获取用户验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      registerForm: {
        // 这里的数据，将来是要提交给服务器
        username: "leo",  //用户名
        phone: "18520409113", //手机号
        email: "phper_leo@163.com", //邮箱
        avatar: "upload/20191024/812d3552cd61e4f94841c2eed190d1ed.JPG", //用户头像
        password: "123456", //密码
        rcode: "1234"   //验证码
      }
    };
  }
};
</script>

<style lang="less">
.register {
  .title {
    height: 53px;
    background: #03c0f9;
    color: #fff;
    text-align: center;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .captcha {
    width: 100%;
    height: 40px;
  }
}
</style>