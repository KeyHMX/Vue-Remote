<template>
  <div class="department">
    <page-search @query-data="handleQureyClick" @reset-data="handleResetClick" />
    <!-- 哈哈，这里就是这个原因 query-data是因为在子组件中emit中的是'querydata' -->
    <page-content ref="contentRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from './c-cpns/page-search.vue'
import pageContent from './c-cpns/page-content.vue'

import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof pageContent>>()
function handleQureyClick(formData: any) {
  console.log('已经点击')
  contentRef.value?.fetchPageListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}
</script>

<style scoped>
.department {
}
</style>
