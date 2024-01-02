import { createStore } from 'redux'

const DefaultValueState: any = {
  openMenu: null,
}

function counterReducer(state: any = DefaultValueState, action: any) {
  switch (action.type) {
    case 'toggle_menu':
      return { ...state, openMenu: !action.payload }
    default:
      return state
  }
}

let store = createStore(counterReducer)

export default store
