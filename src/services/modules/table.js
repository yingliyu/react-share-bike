import { AppGet } from '@/utils/request'

export function getTableData(params) {
  return AppGet('/shareBike/table/list', params)
}
