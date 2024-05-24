<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-data="handleQureyClick"
      @reset-data="handleResetClick"
    />
    <!-- 哈哈，这里就是这个原因 query-data是因为在子组件中emit中的是'querydata' -->
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @modal-call="handleModalCall"
      @edit-call="handleEditCall"
    >
      <template #leader="scope">
        <span class="leader">hhh: {{ scope.row.leader }} </span>
        <span>{{ scope.hName }}</span>
      </template>
      <template #parent="scope">
        <span class="parent">lll: {{ scope.row.parentId }} </span>
      </template>
    </page-content>

    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from './c-cpns/page-modal.vue'
import { ref } from 'vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'

const contentRef = ref<InstanceType<typeof pageContent>>()
const modalRef = ref<InstanceType<typeof pageModal>>()
function handleQureyClick(formData: any) {
  // console.log('已经点击')
  contentRef.value?.fetchPageListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}
function handleModalCall() {
  modalRef.value?.setDialogVisible()
}
//编辑按钮
function handleEditCall(itemData: any) {
  modalRef.value?.setDialogVisible(false, itemData)
}
</script>

<style scoped>
.department {
}
.leader {
  color: yellow;
}
.parent {
  color: blue;
}
</style>
