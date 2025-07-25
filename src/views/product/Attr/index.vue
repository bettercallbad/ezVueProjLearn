<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getTableList="getCategory1List"></CategorySelect>
    </el-card>
    <el-card>
      <el-button type="primary" icon="el-icon-plus">添加属性</el-button>
      <el-table border style="margin-top: 20px;" width="100%" :data="attrList" >

        <el-table-column type="index" label="ID" width="80" align="center"></el-table-column>

        <el-table-column prop="attrName" label="属性名称" width="150" align="center">
        </el-table-column>

        <el-table-column prop="attrValues" label="属性值" width="width" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-for="(attrValue,index) in scope.row.attrValues" :key="attrValue.id" style="margin: 0px 20px">{{attrValue.valuename}}</el-tag>
           
          </template>
        </el-table-column>

        <el-table-column prop="actions" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="editAttrProperty(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="delAttrProperty(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    
    
    </el-card>
  </div>
</template>

<script>



export default {
  name: "Attr",
  data() {
    return {

      attrList: [
        { attrName: "颜色", attrValues: [{valuename:"红色",id:1},{valuename:"黑色",id:2}] },
        { attrName: "尺寸", attrValues: [{valuename:"大",id:1}] },
        { attrName: "材质", attrValues: [{valuename:"棉",id:1}] }
      ],

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
        this.getTableData(params);
      }

    },
    getTableData(params) {
      console.log("Fetching table data with params:", params);
      // Implement the logic to fetch table data based on the selected categories
      // For example, you can call an API here
    },
    editAttrProperty(row) {
      console.log("Editing attribute property:", row);
      // Implement the logic to edit the attribute property
    },
    delAttrProperty(row) {
      console.log("Deleting attribute property:", row);
      // Implement the logic to delete the attribute property
      this.$message.success("属性已删除");
    },
  },
};
</script>

<style></style>
