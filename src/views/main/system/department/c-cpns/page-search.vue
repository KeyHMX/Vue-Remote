<template>
  <div class="search">
    <el-form label-width="90px" size="default" :model="searchForm" ref="formRef">
      <el-row>
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input placeholder="请输入查询的部门名称 " v-model="searchForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" prop="leader">
            <el-input placeholder="请输入部门领导的姓名" v-model="searchForm.leader"> </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
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

const searchForm = reactive({
  name: '',
  leader: '',
  createAt: ''
})
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
