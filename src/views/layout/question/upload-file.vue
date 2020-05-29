<template>
  <div class="uploadFile">
    <el-upload
      class="avatar-uploader"
      name="file"
      :action="BASE_URL + '/question/upload'"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <div v-if="type === 'video'">
        <video v-if="value" :src=" BASE_URL + '/' + value" controls class="avatar"></video>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
      <div v-else>
        <img v-if="value" :src="BASE_URL + '/' + value" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String, // 这里表明 type 类型是字符串
      default: "image" // 这个代表 type 的值，如果没有传递默认就是image
    },
    value: String
  },
  data() {
    return {
      BASE_URL: process.env.VUE_APP_BASEURL //开发阶段的基准路径(打包上线的时候就是生产阶段的基准路径)
    };
  },
  methods: {
    // 上传成功后的回调
    handleAvatarSuccess(res) {
      console.log(res);
      // v-model双向数据绑定的巧妙用法：(相当于:value和@input)
      // 先利用v-model在父组件(question-add-or-update.vue)把questionEditForm.video(:value="questionEditForm.video")通过props传给子组件(upload-file.vue)，
      // 本来questionEditForm.video没有值，当用户上传视频成功后，用$emit把视频上传成功后拿到的url传递会给父组件(question-add-or-update.vue)，
      // 那父组件(question-add-or-update.vue)模型的questionEditForm.video就有值了，因为是双向数据绑定，那父组件又重新传值给子组件，子组件有值了就显示在页面上。
      this.$emit("input", res.data.url);
    },
    // 上传之前的回调(一般限制文件类型与大小)
    beforeAvatarUpload(file) {
      // 代表上传的是视频
      if (this.type === "video") {
        const isVideo = file.type === "video/mp4";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isVideo) {
          this.$message.error("上传视频只能是 MP4 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传视频大小不能超过 2MB!");
        }
        return isVideo && isLt2M;
      } else {
        //代表上传的是图片
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
        return isJPG && isLt2M;
      }
    }
  }
};
</script>

<style lang="less">
.uploadFile {
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