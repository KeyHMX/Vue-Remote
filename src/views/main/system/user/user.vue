<template>
  <div class="user">
    <user-search @query-data="handleQueryData" @reset-data="handleResetData" />
    <user-content ref="contentRef" />
    <user-modal />
  </div>
</template>

<script setup lang="ts" name="user">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import userModal from './c-cpns/user-modal.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof userContent>>()
const handleQueryData = (formData: any) => {
  contentRef.value?.fetchUserListData(formData)
}
const handleResetData = () => {
  contentRef.value?.fetchUserListData()
}
</script>

<style scoped>
::v-deep(.user) {
  background-color: #134590 !important;
  /* border-radius: 20px; */
}
</style>
