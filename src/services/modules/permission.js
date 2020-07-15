import { AppGet } from '@/utils/request'

export function getPermissionList(params) {
  return AppGet('/shareBike/permission/list', params)
}
export function createRole(params) {
  return AppGet('/shareBike/employee/createRole', params)
}

export function setPermission(params) {
  return AppGet('/shareBike/employee/setPermission', params)
}
export function getUserList(params) {
  return AppGet('/shareBike/permission/userList', params)
}
