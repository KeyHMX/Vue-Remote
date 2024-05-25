import { ref } from 'vue'
import type pageModal from '@/views/main/system/department/c-cpns/page-modal.vue'

function useModal() {
  const modalRef = ref<InstanceType<typeof pageModal>>()

  function handleModalCall() {
    modalRef.value?.setDialogVisible()
  }
  //编辑按钮
  function handleEditCall(itemData: any) {
    modalRef.value?.setDialogVisible(false, itemData)
  }
  return {
    modalRef,
    handleEditCall,
    handleModalCall
  }
}

export default useModal
