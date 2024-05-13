<template>
  <div class="search">
    <el-form label-width="90px" size="default" :model="searchForm" ref="formRef">
      <el-row>
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input placeholder="请输入查询的用户名 " v-model="searchForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input placeholder="请输入查询的真实姓名" v-model="searchForm.realname"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="searchForm.cellphone"
              placeholder="请输入查询的手机号码"
            ></el-input> </el-form-item
        ></el-col>

        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              placeholder="请选择查询的状态"
              v-model="searchForm.enable"
              style="width: 100%"
            >
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="0" />
            </el-select>
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
  realname: '',
  cellphone: '',
  enable: '',
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
