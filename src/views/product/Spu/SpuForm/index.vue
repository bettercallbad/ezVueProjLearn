<template>
  <!-- SPU表单 -->
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="form.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <!-- 分类选择组件 -->
        <el-select v-model="tradeMarkList.value" placeholder="请选择品牌">
          <el-option
            v-for="item in tradeMarkList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
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
          :file-list="spuImageList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select :placeholder="`${unSelectSaleAttr.length}项未展示`" value="">
          <el-option :label="unselect.name" :value="unselect.id" v-for="(unselect,index) in unSelectSaleAttr" :key="unselect.id"></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-left: 5px"
          @click="addSalesAttribute"
          >添加销售属性</el-button
        >
        <el-table
          :data="form.spuSaleAttrList"
          style="width: 100%; margin-top: 10px"
          border
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column prop="saleAttrName" label="属性名"></el-table-column>
          <el-table-column
            prop="spuSaleAttrList"
            label="属性值名称列表"
          >
            <template slot-scope="scope">
              <el-tag
                :key="tag.id"
                v-for="tag in scope.row.saleAttrValues"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag.valuename }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(scope.row)"
                >+ New Tag</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="mini"
                @click="removeSalesAttribute(scope.$index)"
                >删除</el-button
              >
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
      dynamicTags: ['标签一', ],
      inputVisible: false,
      inputValue: '',
      dialogImageUrl: "",
      dialogVisible: false,
      tradeMarkList: [
        { label: "品牌1", value: 1 },
        { label: "品牌2", value: 2 },
        { label: "品牌3", value: 3 },
      ], // 品牌列表
      spuImageList: [], //图片墙
      salesAttributesList: [
         { name: "颜色", id: 1 },
        { name: "尺寸", id: 2 },
        { name: "版本", id: 3 },
      ], // 销售属性列表
      form: {
        spuName: "",
        description: "",
        category3Id: 0,
        spuImageList: [],
        spuSaleAttrList: [
          {
          saleAttrName: "颜色",
          saleAttrValues: [{id:1, valuename: "白色" }, {id:2, valuename: "红色" }],
        },{
          saleAttrName: "尺寸",
          saleAttrValues: [{id:1, valuename: "小" }, {id:2, valuename: "大" }],
        }
        ],
      },
    };
  },
  methods: {
    submitForm() {
      // 提交表单逻辑
      console.log("提交SPU表单", this.form);
      // 这里可以调用API保存SPU数据
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    resetFields() {
      this.$emit("changeScene", 0); // 重置场景到SPU列表
    },
    initSPUForm(spu) {
      // 初始化SPU表单数据
      this.form.spuName = spu.spuName || "";
      this.form.description = spu.description || "";
      this.form.spuSaleAttrList = [
        {
          saleAttrName: "颜色",
          saleAttrValues: [{id:1, valuename: "白色" }, {id:2, valuename: "红色" }],
        },{
          saleAttrName: "尺寸",
          saleAttrValues: [{id:1, valuename: "小" }, {id:2, valuename: "大" }],
        }
      ];
      //模拟品牌接口调用
      this.tradeMarkList = [
        { label: "品牌1", value: 1 },
        { label: "品牌2", value: 2 },
        { label: "品牌3", value: 3 },
      ];
      //模拟获取平台的所有销售属性
      this.salesAttributesList = [
        { name: "颜色", id: 1 },
        { name: "尺寸", id: 2 },
        { name: "版本", id: 3 },
      ];
    },
    submitForm() {},
    addSalesAttribute() {},
    handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput(row) {

        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
    },

    handleInputConfirm(row) {
        let inputValue = this.inputValue;
        let inputid =row.saleAttrValues.length+1;
        let param={id:inputid,valuename:inputValue};
        if (inputValue) {
          row.saleAttrValues.push(param);
        }
        this.inputVisible = false;
        this.inputValue = '';
    },
    removeSalesAttribute(index){

    }
    
  },
  computed:{
    unSelectSaleAttr(){
      const selectedNames = this.form.spuSaleAttrList.map(item => item.saleAttrName);
      const unselected = this.salesAttributesList.filter(attr => !selectedNames.includes(attr.name));
      

      return unselected;
    }
  }
};
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
