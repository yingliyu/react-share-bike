import { AppGet } from '@/utils/request'

export function getOrderList(params) {
  return AppGet('/shareBike/order/list', params)
}
export function getOrderDetail(params) {
  return AppGet('/shareBike/order/detail', params)
}
export function endOrder(params) {
  return AppGet('/shareBike/order/end', params)
}
