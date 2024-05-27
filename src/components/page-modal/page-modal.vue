<template>
  <div class="app">
    <el-dialog v-model="dialogVisible" title="新建部门" width="500" align-center>
      <div class="form">
        <el-form
          :model="formData"
          label-width="80px"
          size="large"
          :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
        >
          <template v-for="item in props.modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
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
import { reactive, ref } from 'vue'

import useSystemStore from '@/stores/main/system/system'
const dialogVisible = ref(false)
const isNewRef = ref(true)
const editRef = ref()

interface IModalProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}

const props = defineProps<IModalProps>()

const initialList: any = {}
for (const item of props.modalConfig.formItems) {
  initialList[item.prop] = item.initialValue ?? ''
}

const formData = reactive<any>(initialList)
//请求数据了
// const mainStore = useMainStore()
//获取role/department数据
const systemStore = useSystemStore()
// const { entireDepartments } = storeToRefs(mainStore) //保持响应式，即若更改了服务器的值也会同步修改

//定义设置setDialogVisible方法
const setDialogVisible = (isNew: boolean = true, itemData?: any) => {
  dialogVisible.value = true
  isNewRef.value = isNew
  // console.log(itemData)
  if (!isNew && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editRef.value = itemData //这里为什么要等于itemdata
  } else {
    for (const key in formData) {
      // formData[key] = ''
      const item = props.modalConfig.formItems.find((item) => item.prop === key)
      formData[key] = item ? item.initialValue : ''
    }
    editRef.value = null
  }
  console.log(formData, 'formdata')
}

//点击确定时的逻辑——调用接口进行数据的上传
const handleConfirmClick = () => {
  dialogVisible.value = false
  let infoData = formData
  if (props.otherInfo) {
    console.log('otherinfo remain', props.otherInfo)
    infoData = { ...infoData, ...props.otherInfo }
  }
  //编辑
  if (!isNewRef.value && editRef.value) {
    systemStore.editPageDataAction(props.modalConfig.pageName, editRef?.value.id, infoData)
  } else {
    //新建
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
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
