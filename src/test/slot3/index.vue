<template>
  <div>
      <my-table :data='enterpriseList'>
          <template slot-scope = "scope">
              <span :style="{color:scope.row.status === 0 ? 'red' : 'green'}">{{scope.row.status === 0 ? '启用' : '禁用'}}</span>
          </template>
      </my-table>
  </div>
</template>

<script>
import MyTable from "./MyTable";
export default {
  components: {
    MyTable
  },
  data() {
    return {
      enterpriseList: [
        { name: "腾讯", adress: "深南大道110号", status: 1 },
        { name: "华为", adress: "坂田大道220号", status: 0 },
        { name: "大疆", adress: "深圳湾330号", status: 0 }
      ]
    };
  }
};
</script>

<style>
</style>