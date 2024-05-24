<template>
  <div class="app">
    <el-dialog v-model="dialogVisible" title="新建部门" width="500" align-center>
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="部门名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名" />
          </el-form-item>
          <el-form-item label="领导" prop="leader">
            <el-input v-model="formData.leader" placeholder="请输入领导" />
          </el-form-item>

          <el-form-item label="上级部门" prop="parentId">
            <el-select v-model="formData.parentId" placeholder="请选择上级部门" style="width: 100%">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
                <!-- 其实这里的value起到的是一个定位的作用 -->
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/stores/main/main'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'
import { ref } from 'vue'

import useSystemStore from '@/stores/main/system/system'
const dialogVisible = ref(false)
const isNewRef = ref(true)
const editRef = ref()
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})

//请求数据了
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireDepartments } = storeToRefs(mainStore) //保持响应式，即若更改了服务器的值也会同步修改

// //点击取消时仅仅关闭即可
// const setDialogVisible = () => {
//   dialogVisible.value = true
// }

// //点击确定时的逻辑——调用接口进行数据的上传
// const handleConfirmClick = () => {
//   dialogVisible.value = false
//   systemStore.newPageDataAction('department', formData)
// }

//点击取消时仅仅关闭即可
const setDialogVisible = (isNew: boolean = true, itemData?: any) => {
  dialogVisible.value = true
  isNewRef.value = isNew
  console.log(itemData)
  if (!isNew && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editRef.value = itemData //这里为什么要等于itemdata
  } else {
    for (const key in formData) {
      formData[key] = ''
    }
    editRef.value = null
  }
  console.log(formData)
}

//点击确定时的逻辑——调用接口进行数据的上传
const handleConfirmClick = () => {
  dialogVisible.value = false
  if (!isNewRef.value && editRef.value) {
    systemStore.editPageDataAction('department', editRef?.value.id, formData)
  } else {
    systemStore.newPageDataAction('department', formData)
  }
}
defineExpose({ setDialogVisible })
</script>

<style lang="less" scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .el-dialog__footer {
  padding-top: 0;
}

.modal {
}
</style>
