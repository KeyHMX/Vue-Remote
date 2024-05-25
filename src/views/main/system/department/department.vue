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
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import useContent from '@/hooks/useContent'
import useModal from '@/hooks/useModal'

const { contentRef, handleQureyClick, handleResetClick } = useContent()

const { modalRef, handleEditCall, handleModalCall } = useModal()
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
