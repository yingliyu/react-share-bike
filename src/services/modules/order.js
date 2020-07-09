import { AppGet } from '@/utils/request'

export function getOrderList(params) {
  return AppGet('/shareBike/order/list', params)
}
export function getOrderDetail(params) {
  return AppGet('/shareBike/openCity/list', params)
}
export function endOrder(params) {
  return AppGet('/shareBike/openCity', params)
}
