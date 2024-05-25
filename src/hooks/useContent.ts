import { ref } from 'vue'
import type pageContent from '@/components/page-content/page-content.vue'
function useContent() {
  const contentRef = ref<InstanceType<typeof pageContent>>()
  function handleQureyClick(formData: any) {
    // console.log('已经点击')
    contentRef.value?.fetchPageListData(formData)
  }
  function handleResetClick() {
    contentRef.value?.fetchPageListData()
  }
  return {
    contentRef,
    handleQureyClick,
    handleResetClick
  }
}

export default useContent
