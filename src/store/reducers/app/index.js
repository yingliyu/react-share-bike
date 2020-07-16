import { fromJS } from 'immutable'
import { appActionTypes } from '@/store/action-types'

const defaultState = fromJS({
  currentMenu: ''
})

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state
    case appActionTypes.SWITCH_MENU:
      return state.set('currentMenu', action.payload)
  }
}
