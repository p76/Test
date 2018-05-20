import {combineReducers} from 'redux'
import configureStore from './applyMiddleware'

//通讯录
import {
  C2ABContactScreenReducer,
  C2ABOrganizationReducer
} from 'c2-mobile-contacts';

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  let rootReducer = combineReducers({
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