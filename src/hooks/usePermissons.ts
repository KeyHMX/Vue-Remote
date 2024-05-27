import useLoginStore from '@/stores/login/login'

function usePermissons(id: any) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore
  return !!permissions.find((item) => item.includes(id))
}
export default usePermissons
