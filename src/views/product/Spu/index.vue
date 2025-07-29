<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect
        @getTableList="getCategory1List"
        :show="!show"
      ></CategorySelect>
    </el-card>
    <el-card style="margin: 20px 0px">
      <div v-show="sence === 0">
        <!--展示SPU列表-->
        <el-button type="primary" style="margin-bottom: 5px" @click="addSPU">添加SPU</el-button>
        <el-table border style="width: 100%;margin-bottom: 5px" :data="spuList">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width=""></el-table-column>
          <el-table-column prop="description" label="SPU描述" width=""></el-table-column>
          <el-table-column prop="" label="操作" width="">
            <template slot-scope="scope">
              <hint-button type="success" size="mini" icon="el-icon-plus" hintText="添加sku" @click="addSKU(scope.row)"></hint-button>
              <hint-button type="warning" size="mini" icon="el-icon-edit" hintText="修改spu" @click="editSPU(scope.row)"></hint-button>
              <hint-button type="info" size="mini" icon="el-icon-info" hintText="查看当前spu的全部sku" @click="allSKUofSPU(scope.row)"></hint-button>
              <hint-button type="danger" size="mini" icon="el-icon-delete" hintText="删除spu" @click="delSPU(scope.row)"></hint-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: center"
          background
          layout=" prev, pager, next, jumper,->, sizes,total"
          :total="total"
          :page-size="limit"
          :page-sizes="[10, 20, 30, 40]"
          :current-page="page"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
      <SpuForm v-show="sence === 1" @getTableList="getSpuList"></SpuForm>
      <SkuForm v-show="sence === 2" @getTableList="getSpuList"></SkuForm>
    </el-card>
  </div>
</template>

<script>
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  components: {
    SpuForm,
    SkuForm,
  },
  data() {
    return {
      page:1,
      limit:10,
      category1Id: "",
      category2Id: "",
      category3Id: "",
      show: true,
      total: 30,
      spuList: [], // SPU列表数据
      sence:0, // 场景标识，0表示展示SPU列表，1表示新增或编辑SPU,2表示新增sku
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
          page: this.page,
          limit: this.limit,
          category3Id: this.category3Id,
        };
        this.getSpuList(params);
      }
    },
    getSpuList(params) {
      // 这里应该调用API获取SPU列表数据
      // 目前使用模拟数据
      // 模拟获取SPU列表数据
      console.log("获取SPU列表数据", params);
      this.spuList = [
        { id: 1, spuName: "SPU1", description: "描述1" },
        { id: 2, spuName: "SPU2", description: "描述2" },
        { id: 3, spuName: "SPU3", description: "描述3" },
      ];

    },
    handleCurrentChange(val) {
      this.page = val;
      this.getSpuList({ page: this.page, limit: this.limit });
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getSpuList({ page: this.page, limit: this.limit });
    },
    addSKU(row) {
      console.log("添加SKU", row);
      // 这里应该打开添加SKU的对话框
    },
    addSPU() {
      this.sence = 1; // 切换到添加或编辑SPU的场景

    },
    editSPU(row) {
      console.log("编辑SPU", row);
      // 这里应该打开编辑SPU的对话框
    },
    allSKUofSPU(row) {
      console.log("查看当前SPU的全部SKU", row);
      // 这里应该打开查看SKU的对话框
    },
    delSPU(row) {
      console.log("删除SPU", row);
      // 这里应该调用API删除SPU
    },
  },
};
</script>

<style></style>
