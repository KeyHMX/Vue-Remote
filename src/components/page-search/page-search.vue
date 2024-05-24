<template>
  <div class="search">
    <el-form label-width="90px" size="default" :model="searchForm" ref="formRef">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder">
                </el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="datetimerange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
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

// import searchConfig from '@/views/main/system/department/config/search.config'

//定义自定义事件 接收的属性
const props = defineProps<IProps>()

interface IProps {
  searchConfig: {
    formItems: any[]
  }
}

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
const initialForm: any = []
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)
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
