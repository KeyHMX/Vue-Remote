<template>
  <div class="search">
    <el-form label-width="90px" size="default" :model="searchForm" ref="formRef">
      <el-row :gutter="20"> </el-row>
    </el-form>
    <div class="btns">
      <el-button type="default" size="default" icon="Refresh" @click="handleResetClick"
        >重置</el-button
      >
      <el-button
        type="primary"
        size="default"
        icon="Search"
        style="margin-right: 20px"
        @click="handleQueryClick"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
import { defineEmits } from 'vue'

const formRef = ref<InstanceType<typeof ElForm>>()
// 重置操作

const handleResetClick = () => {
  formRef.value?.resetFields()
  emit('resetData')
}
const emit = defineEmits(['queryData', 'resetData'])

const handleQueryClick = () => {
  emit('queryData', searchForm)
}

const searchForm = reactive({})
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    padding: 8px 15px;
  }
  .btns {
    text-align: right;
  }
  /* .el-button {
    margin-bottom: 10px;
  } */
}
</style>
