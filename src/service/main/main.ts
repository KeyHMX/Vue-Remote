import hyRequest from '..'

export function getEntireRoles() {
  return hyRequest.post({
    url: '/role/list'
  })
}
/**
 *
 * @returns 请求所有部门
 */
export function getEntireDepartments() {
  return hyRequest.post({
    url: '/department/list'
  })
}

export function getEntireMenus() {
  return hyRequest.post({
    url: '/menu/list'
  })
}
