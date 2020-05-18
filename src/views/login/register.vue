<template>
  <el-dialog class="register" center width="600px" :visible.sync="dialogVisible">
    <div class="title" slot="title">用户注册</div>
    <el-form ref="registerFormRef" label-width="80px" :rules="rules" :model="registerForm">
      <el-form-item label="头像" prop="avatar">
        <!-- 设置name属性对应接口的image参数 -->
        <el-upload
          class="avatar-uploader"
          name="image"
          :action="uploadAction"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="username">
        <el-input v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="registerForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="registerForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="code">
        <el-row :gutter="16">
          <el-col :span="16">
            <el-input v-model.number="registerForm.code"></el-input>
          </el-col>
          <el-col :span="7">
            <img class="captcha" @click="changeCode" :src="codeURl" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="rcode">
        <el-row :gutter="16">
          <el-col :span="16">
            <el-input v-model.number="registerForm.rcode"></el-input>
          </el-col>
          <el-col :span="7">
            <el-button @click="getRcode">获取用户验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      // 头像的url
      imageUrl: "",
      uploadAction: process.env.VUE_APP_BASEURL + "/uploads",
      // 图形码的url
      codeURl: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
      dialogVisible: false,
      registerForm: {
        // 这里的数据，将来是要提交给服务器
        username: "", //用户名
        phone: "", //手机号
        email: "", //邮箱
        avatar: "", //头像地址
        password: "", //密码
        code: "", //图形码
        rcode: "" //验证码
      },
      // 表单验证规则
      rules: {
        username: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        phone: [
          // { required: true, message: '请输入手机号', trigger: 'blur' },
          //  { min: 11, max: 11, message: '手机号必须是11位', trigger: 'blur' }
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("手机号不能为空"));
              }
              // 手机号正则
              const res = /^1[3456789][0-9]{9}$/;
              if (!res.test(value)) {
                return callback(new Error("手机号不合法"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("邮箱不能为空"));
              }
              // 邮箱正则
              const res = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
              if (!res.test(value)) {
                return callback(new Error("邮箱不合法!"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 6, max: 12, message: "手机号最少是6位", trigger: "blur" }
        ],
        avatar: [{ required: true, message: "头像不能为空", trigger: "blur" }],
        code: [{ required: true, message: "图形码不能为空", trigger: "blur" }],
        code: [
          // { required: true, message: "图形码不能为空", trigger: "blur" },
          // { min: 4, max: 4, message: "图形码必须是4位", trigger: "blur" }
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("图形码不能为空"));
              }
              if (!Number.isInteger(value)) {
                return callback(new Error("图形码必须是数字"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        rcode: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("验证码不能为空"));
              }
              if (!Number.isInteger(value)) {
                return callback(new Error("验证码必须是数字"));
              }
              callback();
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 点击刷新验证码
    changeCode() {
      this.codeURl =
        process.env.VUE_APP_BASEURL +
        "/captcha?type=sendsms&r=" +
        Math.random();
    },
    // 获取用户验证码
    async getRcode() {
      // 第一种方法：
      // this.$axios
      //   .post("/sendsms", {
      //     code: this.registerForm.code,
      //     phone: this.registerForm.phone
      //   })
      //   .then(res => {
      //     console.log(res);
      //     if (res.data.code === 200) {
      //       this.registerForm.rcode = res.data.data.captcha
      //     }else{
      //       this.$message.error(res.data.message);
      //       // 重新刷新图形码
      //       this.changeCode()
      //     }
      //   });

      // 第二种方法：
      const res = await this.$axios.post("/sendsms", {
        code: this.registerForm.code,
        phone: this.registerForm.phone
      });
      if (res.data.code === 200) {
        this.registerForm.rcode = res.data.data.captcha;
      } else {
        this.$message.error(res.data.message);
        // 重新刷新图形码
        this.changeCode();
      }
    },
    // 头像上传之前的回调函数
    beforeAvatarUpload(file) {
      // console.log(file);
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG/GIF 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // 如果要进行上传文件的请求，我们必须返回true，它才会进行文件上传
      return isJPG && isLt2M;
    },
    // 头像上传成功之后的回调函数(有两个参数)
    handleAvatarSuccess(res, file) {
      // console.log(res);
      // 头像上传成功之后，需设置头像的url显示在页面的头像框
      this.imageUrl = process.env.VUE_APP_BASEURL + "/" + res.data.file_path;

      // 给registerForm中的avatar模型赋值，点击提交的时候把地址上传给服务器
      this.registerForm.avatar = res.data.file_path;
    },
    // 注册
    submit() {
      // 做最后一次的校验
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return; //校验不通过，就阻断继续往下面执行
        // 第一种：
        // this.$axios.post("/register", this.registerForm).then(res => {
        //   console.log(res);
        //   if (res.data.code === 200) {
        //     // 提示
        //     this.$message({
        //       message: "注册成功!",
        //       type: "success"
        //     });
        //     // 关掉当前窗口
        //     this.dialogVisible = false;
        //   }else{
        //     this.$message.error(res.data.message);
        //   }
        // });

        // 第二种
        const res =await this.$axios.post("/register", this.registerForm);
        // console.log(res);
        if (res.data.code === 200) {
          // 提示
          this.$message({
            message: "注册成功!",
            type: "success"
          });
          // 关掉当前窗口
          this.dialogVisible = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
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
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>