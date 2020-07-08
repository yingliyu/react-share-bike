import { AppGet } from '@/utils/request'

export function getCityList(params) {
  return AppGet('/shareBike/city/list', params)
}
export function getOpenCityList(params) {
  return AppGet('/shareBike/openCity/list', params)
}
export function openCity(params) {
  return AppGet('/shareBike/openCity', params)
}
