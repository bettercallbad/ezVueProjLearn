<template>
    <a :title="hintText" style="margin:10px ">
        <el-button v-bind="$attrs" v-on="$listeners"></el-button>
    </a>
</template>

<script>
export default {
    name: "HintButton",
    props:['hintText'],
}
</script>

<style>

</style>