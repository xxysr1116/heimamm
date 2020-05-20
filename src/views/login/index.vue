<template>
  <div class="login-container">
    <div class="left">
      <div class="title-box">
        <img src="@/assets/login_icon.png" alt />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- form表单部分 -->
      <el-form class="login-form" :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="phone">
          <el-input v-model="loginForm.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="18">
            <el-col :span="16">
              <el-input v-model="loginForm.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="captcha" :src="codeURL" @click="getCode" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="isCheck">
          <el-checkbox v-model="loginForm.isCheck"></el-checkbox>我已阅读并同意
          <el-link type="primary" href="http://www.baidu.com">用户协议</el-link>和
          <el-link type="primary" href="http://www.baidu.com">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click="loginClick" type="primary">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click="register" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/login_bg.png" alt />
    </div>
    <!-- 注册子组件 -->
    <register ref="registerRef"></register>
  </div>
</template>

<script>
// 按需导入
import { setToken } from "@/utils/token.js";

// 导入register子组件
import register from "./register.vue";
export default {
  data() {
    return {
      name: "Login",
      codeURL: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      // 模型
      loginForm: {
        phone: "18511111111", //手机号
        password: "12345678", //密码
        code: "", //验证码
        isCheck: true //是否勾选了用户协议
      },
      // 校验规则
      rules: {
        phone: [
          // 是个数组，代表这个里面可以写多个校验规则
          // { required: true, message: "请输入手机号码", trigger: "blur" },
          // { min: 11, max: 11, message: "长度在 11 个字符", trigger: "blur" },
          // 自定义校验规则
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("手机号不能为空"));
              }
              const reg = /^1[3456789][0-9]{9}$/;
              if (!reg.test(value)) {
                return callback(new Error("手机号格式不合法"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 位", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度必须是4位", trigger: "blur" }
        ],
        isCheck: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("请勾选用户协议"));
              }
              callback();
            },
            trigger: "change"
          }
        ]
      }
    };
  },
  components: {
    register
  },
  methods: {
    // 获取验证码
    getCode() {
      // 不发请求，url有缓存，因为是git请求，还有url没变
      // this.codeURL = process.env.VUE_APP_BASEURL + '/captcha?type=login&r=' + (new Date() - 0)  //时间戳(此时此刻每个时间都是唯一的)
      this.codeURL =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&r=" + Math.random();
    },
    // 登录
    loginClick() {
      // 最后对整个表单做一个校验,valid为false，则校验不通过
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid);
        if (!valid) return; //不通过校验，阻断代码继续往下面执行

        // 第一种：发请求给后台完成登录 (this.loginForm ：参数)
        /*
        this.$axios.post("/login", this.loginForm).then(res => {
          // console.log(res);
          if (res.data.code === 200) {
            this.$message({
              message: "登录成功~",
              type: "success"
            });
          } else {
            this.$message.error(res.data.message);
          }
        });
        */

        //第二种：使用promise(类似于同步操作，本质是异步操作，避免回调地狱)来处理发送axios请求(asyns 写在 await 离的最近的函数)
        // this.$axios.post("/login", this.loginForm) 返回的是promise对象 实际开发用的比较多
        const res = await this.$axios.post("/login", this.loginForm);
        if (res.data.code === 200) {
          // console.log(res);
          this.$message({
            message: "登录成功~",
            type: "success"
          });
          // 成功之后保存token
          setToken(res.data.data.token);

          // 跳转到后台管理页面
          this.$router.push("/layout");
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    register() {
      this.$refs.registerRef.dialogVisible = true;
    }
  }
};
</script>

<style lang="less">
.login-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 48px;
    .title-box {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        background-color: #c7c7c7;
        height: 27px;
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    .login-form {
      margin-top: 29px;
      .captcha {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>