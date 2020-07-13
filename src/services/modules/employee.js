// 员工管理
import { AppGet } from '@/utils/request'

// 查询
export function getEmployeeList(params) {
  return AppGet('/shareBike/employee/list', params)
}
export function getOrderDetail(params) {
  return AppGet('/shareBike/order/detail', params)
}
export function endOrder(params) {
  return AppGet('/shareBike/order/end', params)
}
