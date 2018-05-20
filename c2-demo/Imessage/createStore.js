import {combineReducers} from 'redux'
import configureStore from './applyMiddleware'

import {
  C2IMMessageReducer,
  C2IMSessionReducer,
  C2IMLiveScreenReducer,
  C2IMContactsReducer,
  C2IMServerReducer
} from 'c2-mobile-imessage';

//通讯录
import {
  C2ABContactScreenReducer,
  C2ABOrganizationReducer
} from 'c2-mobile-contacts';

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  let rootReducer = combineReducers({
    //IM
    C2IMessage: combineReducers({
      session: C2IMSessionReducer,
      message: C2IMMessageReducer,
      liveScreen: C2IMLiveScreenReducer,
      contacts: C2IMContactsReducer,
      server: C2IMServerReducer
    }),
    //通讯录
    C2AddressBook: combineReducers({
      organization: C2ABOrganizationReducer,
      contactScreen: C2ABContactScreenReducer,
    }),
  })

  // 登出清空state
  const appReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
      state = {}
    }

    return rootReducer(state, action)
  }

//应用中间件
  const store = configureStore(appReducer)

  return store
}