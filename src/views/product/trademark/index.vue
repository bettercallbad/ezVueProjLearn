<template>
    <div>
        <el-button type="primary" @click="handleAddTrademark" icon="el-icon-plus" style="margin: 10px 0px ">添加商标</el-button>
        <el-table :data="trademarks" style="width: 100%" border >
            <el-table-column prop="name" label="商标名称" width="100" align="center"></el-table-column>
            <el-table-column prop="type" label="商标类型" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" align="center"></el-table-column>
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



    </div>
</template>

<script>
export default {
    name: 'Trademark',
    mounted() {
        this.getList();
    },
    data() {
        return {
            trademarks: [
                { name: '商标A', type: '注册商标', status: '有效', createdAt: '2023-01-01', updatedAt: '2023-06-01' },
                { name: '商标B', type: '未注册商标', status: '无效', createdAt: '2023-02-01', updatedAt: '2023-07-01' },
                // 更多商标数据...
            ]
        };
    },
    methods: {
        // 获取商标列表
        getList() {
            console.log(this.$api.traderMarkApi.getTraderMarks);
        },
        // 定义方法
        handleAddTrademark() {
            // 添加商标的逻辑
        }
    },
}
</script>

<style scoped>  

</style>