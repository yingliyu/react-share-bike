// 员工管理
import { AppGet } from '@/utils/request'

// 查询
export function getEmployeeList(params) {
  return AppGet('/shareBike/employee/list', params)
}
export function getEmployeeDetail(params) {
  return AppGet('/shareBike/employee/detail', params)
}
export function deleteEmployee(params) {
  return AppGet('/shareBike/employee/delete', params)
}
