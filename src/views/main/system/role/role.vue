<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-data="handleQureyClick"
      @reset-data="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      @edit-call="handleEditCall"
      @modal-call="handleModalCall"
      ref="contentRef"
    />
    <page-modal :modal-config="modalConfig" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="role">
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import useContent from '@/hooks/useContent'
import useModal from '@/hooks/useModal'

//解构各种逻辑
const { contentRef, handleQureyClick, handleResetClick } = useContent()
const { modalRef, handleEditCall, handleModalCall } = useModal()
</script>

<style scoped>
.role {
}
</style>
