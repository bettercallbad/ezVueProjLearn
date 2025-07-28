<template>
  <div>
    <el-form :inline="true" :model="categoryForm" class="demo-form-inline">
      
      <el-form-item label="一级分类">
        <el-select v-model="categoryForm.category1" placeholder="请选择一级分类" @change="getCategory2List" :disabled="show">
          <el-option v-for="(item) in list1" :key="item.id" 
          :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="categoryForm.category2" placeholder="请选择二级分类" @change="getCategory3List" :disabled="show">
          <el-option v-for="(item) in list2" :key="item.id" 
          :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryForm.category3" placeholder="请选择三级分类" @change="getTableData" :disabled="show">
          <el-option v-for="(item) in list3" :key="item.id" 
          :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  data() {
    return {
      list1: [
        { id: 1, name: "分类一", value: "category1" },
        { id: 2, name: "分类二", value: "category2" },
        { id: 3, name: "分类三", value: "category3" },
      ],
      list2: [],
      list3: [],
      categoryForm: {
        category1: "",
        category2: "",
        category3: "",
      },
      formInline: {
        user: "",
        region: "",
      },
    };
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    fetchCategory1List() {
      this.list2= [];
      this.list3 = [];
      this.categoryForm.category3 = ""; // Reset category 3 selection
      this.categoryForm.category2 = ""; // Reset category 2 selection 
      // this.$api.attributeApi.getCategory1List().then((response) => {
      //   // Handle the response for category 1 list
      //   if (response.data && response.data.length > 0) {
      //     this.list1 = response.data;
      //     // Optionally, you can set the first item as the default selected value
      //     this.formInline.region = this.list1[0].value;
      //   }
      //   console.log("Category 1 List:", response.data);
      // }).catch((error) => {
      //   console.error("Error fetching category 1 list:", error);
      // });
     },
    getCategory2List() {
      this.list3 = [];
  
      this.$emit('getTableList', {
        categoryId: this.categoryForm.category1,
        level: 1,
      }); // Emit event to parent component
      this.categoryForm.category3 = ""; // Reset category 3 selection
      // Simulate fetching category 2 list based on selected category 1
      if (this.categoryForm.category1) {
        // Replace with actual API call
        this.list2 = [
          { id: 1, name: "二级分类一", value: "category2-1" },
          { id: 2, name: "二级分类二", value: "category2-2" },
        ];
      } else {
        this.list2 = [];
      }
      this.categoryForm.category2 = ""; // Reset category 2 selection
      this.categoryForm.category3 = ""; // Reset category 3 selection
    },
    getCategory3List() {
      // Simulate fetching category 3 list based on selected category 2
      this.$emit('getTableList', {categoryId: this.categoryForm.category2,
        level: 2,}); // Emit event to parent component
      if (this.categoryForm.category2) {
        // Replace with actual API call
        this.list3 = [
          { id: 1, name: "三级分类一", value: "category3-1" },
          { id: 2, name: "三级分类二", value: "category3-2" },
        ];
      } else {
        this.list3 = [];
      }
      this.categoryForm.category3 = ""; // Reset category 3 selection
    },
    getTableData() {
      
      if (!this.categoryForm.category1 || !this.categoryForm.category2 || !this.categoryForm.category3) {
        this.$message.error("请先选择完整的分类");
        return;
      }
      this.$emit('getTableList', {categoryId:this.categoryForm.category3,level :3}); // Emit event to parent component
      // Simulate fetching table data based on selected categories
      console.log("Selected Categories3:", this.categoryForm.category3);
      // Replace with actual API call to fetch table data
    },
  },
  mounted() {
    // You can fetch initial data here if needed
    this.fetchCategory1List();
  },
};
</script>

<style></style>
