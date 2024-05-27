import { ref } from 'vue'
import type pageModal from '@/views/main/system/department/c-cpns/page-modal.vue'

type CallbackFnType = (data?: any) => void
function useModal(editCallback?: CallbackFnType) {
  const modalRef = ref<InstanceType<typeof pageModal>>()

  function handleModalCall() {
    modalRef.value?.setDialogVisible()
  }
  //编辑按钮
  function handleEditCall(itemData: any) {
    modalRef.value?.setDialogVisible(false, itemData)
    console.log({ ...itemData.menuList }, 'menulist')
    if (editCallback) editCallback(itemData)
  }
  return {
    modalRef,
    handleEditCall,
    handleModalCall
  }
}

export default useModal
