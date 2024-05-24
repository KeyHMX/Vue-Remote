<template>
  <div class="user">
    <user-search @query-data="handleQueryData" @reset-data="handleResetData" />
    <user-content ref="contentRef" @modal-call="handleModalCall" @editcall="handleEditCall" />
    <!-- 这里需要注意，usercontent中传递出来的事件 modalcall 对应这个@modal-call 这个是做监听的 必须以emit中的字符串中间-分隔为标准格式 -->
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import userModal from './c-cpns/user-modal.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof userContent>>()
const modalRef = ref<InstanceType<typeof userModal>>()
const handleQueryData = (formData: any) => {
  contentRef.value?.fetchUserListData(formData)
}
const handleResetData = () => {
  contentRef.value?.fetchUserListData()
}
const handleModalCall = () => {
  modalRef.value?.setDialogVisible()
}
const handleEditCall = (itemData: any) => {
  modalRef.value?.setDialogVisible(false, itemData)

  // console.log(itemData)
}
</script>

<style scoped>
::v-deep(.user) {
  background-color: #134590 !important;
  /* border-radius: 20px; */
}
</style>
