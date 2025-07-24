<template>
    <div>
        <el-button type="primary" @click="handleAddTrademark" icon="el-icon-plus" style="margin: 10px 0px ">添加商标</el-button>
        


        <el-table :data="trademarks" style="width: 100%" border >
            <el-table-column prop="name" label="商标名称" width="100" align="center"></el-table-column>
            <el-table-column prop="type" label="商标类型" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" align="center"></el-table-column>
            <el-table-column prop="logo" label="商标Logo" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.logo"  alt="商标Logo" style="width: 50px; height: 50px;">
                </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间" align="center"></el-table-column>
            <el-table-column prop="updatedAt" label="更新时间" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleEditTrademark(scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDeleteTrademark(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout=" prev, pager, next, ->,jumper,total, sizes"
            :current-page="1"
            :total="100"
            :page-size="10"
            :page-sizes="[10, 20, 30, 40]"
            style="text-align: center; margin-top: 20px;">
        </el-pagination>
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="活动名称" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" label-width="120px">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"                  
                >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
        </el-dialog>


    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'Trademark',
    mounted() {
        this.getList();
    },
    data() {
        return {
            page: 1,
            limit: 10,
            trademarks: [
                { name: '商标A', type: '注册商标', status: '有效', createdAt: '2023-01-01', updatedAt: '2023-06-01' },
                { name: '商标B', type: '未注册商标', status: '无效', createdAt: '2023-02-01', updatedAt: '2023-07-01' },
                // 更多商标数据...
            ],
            dialogFormVisible: false,
            form: {
                name: '',
                region: ''
            },
            dialogTitle: '',
            imageUrl: '', // 用于存储上传的图片URL

        };
    },
    methods: {
        // 获取商标列表
        getList() {
            const {page, limit} = this
            console.log(this.$api.traderMarkApi.getTraderMarks);
            //let result = this.$api.traderMarkApi.getTraderMarks({page, limit});
            // if(result.code === 200) {
            //     this.trademarks = result.data.records;
            // } else {
            //     this.$message.error(result.message);
            // }
        },
        // 定义方法
        handleAddTrademark() {
            // 添加商标的逻辑
            this.dialogTitle = '添加商标';
            this.dialogFormVisible = true;
        },
        handleEditTrademark(row) {
            // 编辑商标的逻辑
            this.dialogTitle = '编辑商标';
            this.dialogFormVisible = true;
            this.form.name = row.name;
            this.form.region = row.type; // 假设type是区域
        },handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

    },
}
</script>

<style scoped>  
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>