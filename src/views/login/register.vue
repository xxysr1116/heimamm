<template>
  <el-dialog title="注册" width="600px" :visible.sync="dialogVisible">
    <span>这是个注册弹出框</span>
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
      dialogVisible: false
    };
  }
};
</script>

<style>
</style>