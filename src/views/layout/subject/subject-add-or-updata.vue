<template>
  <div class="subject">
    <el-dialog center :visible.sync="dialogVisible" width="600">
      <div slot="title" class="title">{{mode === 'add' ? '新增学科' : '编辑学科'}}</div>
      <el-form :model="subjectForm" :rules="rules" ref="subjectFormRef" label-width="80px">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="subjectForm.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="subjectForm.name"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" prop="short_name">
          <el-input v-model="subjectForm.short_name"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" prop="intro">
          <el-input v-model="subjectForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" prop="remark">
          <el-input v-model="subjectForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible= false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      mode: "", //模式 新增(add) & 编辑(edit)
      subjectForm: {
        rid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简称
        intro: "", //学科简介
        remark: "" //学科备注
      },
      rules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [
          { required: true, message: "学科名称不能为空", trigger: "blur" }
        ],
        short_name: [
          { required: true, message: "学科简称不能为空", trigger: "blur" }
        ],
        intro: [
          { required: true, message: "学科简介不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "学科备注不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.subjectFormRef.validate(async valid => {
        if (!valid) return;
        let res = null;
        if (this.mode === "add") {
          res = await this.$axios.post("/subject/add", this.subjectForm);
        } else {
          // 修改
          res = await this.$axios.post("/subject/edit", this.subjectForm);
        }
        if (res.data.code === 200) {
          this.$message({
            type: "success",
            message: this.mode === "add" ? "新增成功!" : "编辑成功!"
          });
          // 关闭当前窗口
          this.dialogVisible = false;
          // 调用父组件的search方法刷新
          this.$parent.search();
        }
      });
    }
  },
  watch: {
    // 监控窗口的开关，在窗口关闭的时候，清除校验规则(新增与编辑的校验规则)
    dialogVisible(newValue) {
      if (!newValue) {
        this.$refs.subjectFormRef.clearValidate();
      }
    }
  }
};
</script>

<style lang="less">
.subject {
  .title {
    text-align: center;
    color: #fff;
    background-color: #0e9ff9;
    height: 53px;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}
</style>