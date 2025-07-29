<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getTableList="getCategory1List" :show="!isShowTable"></CategorySelect>
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
                :key="attrValue.name"
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
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
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
                placeholder="请输入属性值名称"
                size="mini"
                v-if="scope.row.flag"
                @blur="toLook(scope.row)"
                :ref="'input' + scope.$index"
              ></el-input>
              <span v-else @click="toEdit(scope)">{{
                scope.row.valuename
              }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="actions" label="操作" width="width">
            <template slot-scope="scope">
              <el-popconfirm
                :title="`确定删除${scope.row.valuename}吗？`"
                @onConfirm="delattrValue(scope.row)"
              >
                <el-button type="warning" size="mini" @click="toEdit(scope)"
                  >编辑</el-button
                >
                <el-button type="danger" size="mini" slot="reference"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="uploadAttrInfo" :disabled="attrInfo.attrValues.length<1">保存</el-button>
        <el-button @click="cancelAttrInfo"> 取消 </el-button>
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
        attrValues: [],
        categoryId: 0,
        categoryLevel: 3,
      },
    };
  },
  methods: {
    getCategory1List({ categoryId, level }) {
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

      const rowData = cloneDeep(row);
      this.attrInfo = {
        ...rowData,
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
      this.attrInfo.attrValues.forEach((item) => {
        this.$set(item, "flag", false); // Ensure each item has a flag property
      });
      // Implement the logic to edit the attribute property
    },
    delAttrProperty(row) {
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
        attrId: this.attrInfo.id,
        valuename: "",
        flag: true,
      });
      this.$nextTick(() => {
        const inputElement =
          this.$refs["input" + (this.attrInfo.attrValues.length - 1)];
        if (inputElement) {
          inputElement.focus();
        }
      });
    },
    delattrValue(row) {
      const index = this.attrInfo.attrValues.indexOf(row);
      if (index > -1) {
        this.attrInfo.attrValues.splice(index, 1);
      }
      this.$message.success("属性值已删除");
    },
    toLook(row) {
      if (row.valuename.trim() === "") {
        this.$message.error("属性值名称不能为空");
        row.flag = true; // Keep the input field active
        return;
      }
      let isReapt = this.attrInfo.attrValues.some((item) => {
        if (item.valuename === row.valuename && item !== row) {
          this.$message.error("属性值名称已存在");
          row.flag = true; // Keep the input field active
          return true;
        }
        return false;
      });
      if (isReapt) return;
      row.flag = false;
    },
    toEdit(scope) {
      scope.row.flag = true;
      this.$nextTick(() => {
        const inputElement = this.$refs["input" + scope.$index];

        if (inputElement) {
          inputElement.focus();
        }
      });
    },
    cancelAttrInfo() {
      this.isShowTable = true;
      this.attrInfo = {
        attrName: "",
        attrValues: [],
        categoryId: 0,
        categoryLevel: 3,
      };
    },
    uploadAttrInfo() {
      this.attrInfo.attrValues = this.attrInfo.attrValues.filter((item) => {
        if (item.valuename.trim() !== "") {
          delete item.flag; // Remove flag property before sending to backend
          return true;
        }
      });

      const existing = this.attrList.find(
        (item) => item.attrName === this.attrInfo.attrName
      );

      if (existing) {
        // 现有的 valuename 集合，用于快速查重
        const existingNames = new Set(
          existing.attrValues.map((item) => item.valuename)
        );

        this.attrInfo.attrValues.forEach((newItem) => {
          if (!existingNames.has(newItem.valuename)) {
            // 添加新项，id 可以是 undefined 或随机字符串
            existing.attrValues.push({
              id: undefined, // 或用 Math.random() 生成
              valuename: newItem.valuename,
            });
            existingNames.add(newItem.valuename);
          }
        });
      } else {
        // 直接追加
        this.attrList.push({
          attrName: attrInfo.attrName,
          attrValues: [...attrInfo.attrValues],
        });
      }

      // this.$api.attributeApi.addAttr(this.attrInfo).then((res) => {
      //   if (res.code === 200) {
      //     this.$message.success("属性信息已保存");
      //     this.isShowTable = true;
      //     this.getTableData({
      //       category1Id: this.category1Id,
      //       category2Id: this.category2Id,
      //       category3Id: this.category3Id,
      //     });
      //   } else {
      //     this.$message.error(res.message);
      //   }
      // });

      this.$message.success("属性信息已保存");
      this.isShowTable = true;
    },
  },
};
</script>

<style></style>
