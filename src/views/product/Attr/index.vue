<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getTableList="getCategory1List"></CategorySelect>
    </el-card>
    <el-card> </el-card>
  </div>
</template>

<script>


export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",

    };
  },
  methods: {
    getCategory1List({categoryId,level}) {
      console.log("Selected Category ID:", categoryId, "Level:", level);
      if (level === 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level === 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else if (level === 3) {
        this.category3Id = categoryId;
        const params = {
          category1Id: this.category1Id,
          category2Id: this.category2Id,
          category3Id: this.category3Id,
        };
        getTableData(params);
      }

    },
    getTableData(params) {
      console.log("Fetching table data with params:", params);
      // Implement the logic to fetch table data based on the selected categories
      // For example, you can call an API here
    },
  },
};
</script>

<style></style>
