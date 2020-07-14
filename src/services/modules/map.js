import { AppGet } from '@/utils/request'

export function getBikeList(params) {
  return AppGet('/shareBike/order/list', params)
}
