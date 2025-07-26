<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect  @getTableList="getCategory1List"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttrProperty"
          >添加属性</el-button
        >
        <el-table border style="margin-top: 20px" width="100%" :data="attrList">
          <el-table-column
            type="index"
            label="ID"
            width="80"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="attrName"
            label="属性名称"
            width="150"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="attrValues"
            label="属性值"
            width="width"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                type="success"
                v-for="attrValue in scope.row.attrValues"
                :key="attrValue.id"
                style="margin: 0px 20px"
                >{{ attrValue.valuename }}</el-tag
              >
            </template>
          </el-table-column>

          <el-table-column
            prop="actions"
            label="操作"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="warning"
                size="mini"
                @click="editAttrProperty(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="mini"
                @click="delAttrProperty(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              v-model="attrInfo.attrName"
              placeholder="请输入属性名"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="addAttrValue" :disabled="!attrInfo.attrName">添加属性值</el-button>
        <el-button @click="isShowTable = true"> 取消 </el-button>
        <el-table
          style="width: 100%; margin: 20px 0px"
          border
          :data="attrInfo.attrValues"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="attrName"
            label="属性值名称"
            width="width"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.valuename"
                placeholder="请输入属性值名称" size="mini"
              ></el-input>
            </template>


          </el-table-column>

          <el-table-column
            prop="actions"
            label="操作"
            width="width"
          >
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="mini" @click="delattrValue(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="isShowTable = true"> 取消 </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>

import cloneDeep from "lodash/cloneDeep";

export default {
  name: "Attr",
  data() {
    return {
      isShowTable: true,


      attrList: [],

      category1Id: "",
      category2Id: "",
      category3Id: "",
      //修改或者新增属性使用
      attrInfo: {
        attrName: "",
        attrValues: [
        ],
        categoryId: 0,
        categoryLevel: 3,
      },
    };
  },
  methods: {
    getCategory1List({ categoryId, level }) {
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
      this.attrList = [
        {
          attrName: "颜色",
          attrValues: [
            { valuename: "红色", id: 1 },
            { valuename: "黑色", id: 2 },
          ],
        },
        { attrName: "尺寸", attrValues: [{ valuename: "大", id: 1 }] },
        { attrName: "材质", attrValues: [{ valuename: "棉", id: 1 }] },
      ];
    },
    editAttrProperty(row) {
      this.isShowTable = false;
      //数据结构存在数组套对象,需要深拷贝
      console.log("Editing attribute property:", row);
      const rowData=cloneDeep(row);
      this.attrInfo = { ...rowData, categoryId: this.category3Id, categoryLevel: 3 };
      // Implement the logic to edit the attribute property
    },
    delAttrProperty(row) {
      console.log("Deleting attribute property:", row);
      // Implement the logic to delete the attribute property
      this.$message.success("属性已删除");
    },
    addAttrProperty() {
      this.isShowTable = false;
      this.attrInfo = {
        attrName: "",
        attrValues: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
    },
    addAttrValue() {
      this.attrInfo.attrValues.push({ 
        attrId:undefined,valuename: "" });
    },
    delattrValue(row) {
      const index = this.attrInfo.attrValues.indexOf(row);
      if (index > -1) {
        this.attrInfo.attrValues.splice(index, 1);
      }
      this.$message.success("属性值已删除");
    },
  },
};
</script>

<style></style>
