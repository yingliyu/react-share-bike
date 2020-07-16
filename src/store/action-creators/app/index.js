import { appActionTypes } from '@/store/action-types'

export function switchMenu(val) {
  return {
    type: appActionTypes.SWITCH_MENU,
    payload: val
  }
}
