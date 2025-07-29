<template>
  <!-- SPU表单 -->
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="form.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <!-- 分类选择组件 -->
        <el-select v-model="form.category" placeholder="请选择品牌" value="">
          <el-option label="分类1" value="1"></el-option>
          <el-option label="分类2" value="2"></el-option>
          <el-option label="分类3" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          v-model="form.description"
          rows="4"
          placeholder="SPU描述"
        ></el-input>
      </el-form-item>

      <el-form-item label="SPU图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">   
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select v-model="form.salesAttributes" placeholder="请选择销售属性">
          <el-option label="颜色" value="color"></el-option>
          <el-option label="尺寸" value="size"></el-option>
          <el-option label="材质" value="material"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" style="margin-left: 5px;" @click="addSalesAttribute">添加销售属性</el-button>
        <el-table :data="form.salesAttributesList" style="width: 100%; margin-top: 10px;" border>
            <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="name" label="属性名"></el-table-column>
          <el-table-column prop="value" label="属性值名称列表"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="removeSalesAttribute(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
        dialogImageUrl: '',
        dialogVisible: false,
        form: {
            spuName: "",
            description: "",
        },
    };
  },
  methods: {
    submitForm() {
      // 提交表单逻辑
      console.log("提交SPU表单", this.form);
      // 这里可以调用API保存SPU数据
    },
    handlePictureCardPreview(file){
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log(file);
    },
    handleRemove(file, fileList){
        console.log(file, fileList);
    },
    resetFields() {
      this.$emit("changeScene", 0); // 重置场景到SPU列表  
    },
    initSPUForm(spu) {
      
      this.form = {
        spuName: "",
        description: "",
        category: "",
        salesAttributes: "",
        salesAttributesList: [],
      };
    },
    submitForm() {
      
    },
    addSalesAttribute(){
      
    },
    

  },
 
  
};
</script>

<style scoped></style>
