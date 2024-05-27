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
    <!-- 这里要加上这个:other-info的原因是组件之间需要进行通信，这里是父传子，传到page-modal中进行操作 -->
    <page-modal :other-info="otherInfo" :modal-config="modalConfig" ref="modalRef">
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </page-modal>
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
import useMainStore from '@/stores/main/main'
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'
import type { ElTree } from 'element-plus'
import { mapMenuListToIds } from '@/utils/map-manus'
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
const otherInfo = ref({})

//解构各种逻辑
const { contentRef, handleQureyClick, handleResetClick } = useContent()
const { modalRef, handleEditCall, handleModalCall } = useModal(editCallback)

//check逻辑
function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  // console.log(data2.checkedKeys)
  // console.log(menuList, 'menulist')
  otherInfo.value = { menuList }
}
//列表高亮回显
const treeRef = ref<InstanceType<typeof ElTree>>()
function editCallback(itemData: any) {
  // nexttick是为了响应当前的操作的同时将这次操作的结果挂载到dom上
  // nexttick 在vue3中 是一个微任务
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList)
    console.log(menuIds)

    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<style scoped>
.role {
}
</style>
