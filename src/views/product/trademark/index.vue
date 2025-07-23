<template>
    <div>
        <el-button type="primary" @click="handleAddTrademark" icon="el-icon-plus">添加商标</el-button>
        <el-table :data="trademarks" style="width: 100%">
            <el-table-column prop="name" label="商标名称" width="180"></el-table-column>
            <el-table-column prop="type" label="商标类型" width="180"></el-table-column>
            <el-table-column prop="status" label="状态" width="180"></el-table-column>
            <el-table-column prop="createdAt" label="创建时间" width="180"></el-table-column>
            <el-table-column prop="updatedAt" label="更新时间" width="180"></el-table-column>
            <el-table-column label="操作" width="180">
                
            </el-table-column>
        </el-table>



    </div>
</template>

<script>
export default {
    name: 'Trademark',
    data() {
        return {
            // 定义数据
        };
    },
    methods: {
        // 定义方法
        handleAddTrademark() {
            // 添加商标的逻辑
        }
    },
}
</script>

<style scoped>  

</style>