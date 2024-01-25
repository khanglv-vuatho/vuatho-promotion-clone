import { createStore } from 'redux'

const DefaultValueState: any = {
  openMenu: null,
  infoUser: {
    thumb: '',
    name: '',
    phone: '',
    id: '',
    listNumber: [],
    code: ''
  }
}

function counterReducer(state: any = DefaultValueState, action: any) {
  switch (action.type) {
    case 'toggle_menu':
      return { ...state, openMenu: !action.payload }
    case 'login':
      return { ...state, infoUser: action.payload }
    default:
      return state
  }
}

let store = createStore(counterReducer)

export default store
