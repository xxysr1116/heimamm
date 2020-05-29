<script>
export default {
  methods: {
    // 更改状态的公共方法
    async changeStatus(url, id) {
      const res = await this.$axios.post(url, { id });
      if (res.data.code === 200) {
        this.$message({
          type: "success",
          message: "更改状态成功!"
        });
        // 刷新调用search方法
        this.getData();
      }
    },
    // 删除的公共方法
    del(url, id) {
      this.$confirm("确定要删除该数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.post(url, { id });
          if (res.data.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getData();
          }
        })
        .catch(() => {});
    }
  }
};
</script>