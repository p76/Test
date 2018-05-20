import { createStore, applyMiddleware ,compose} from 'redux'
import { autoRehydrate } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'

import thunkMiddleware from 'redux-thunk';
// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */
  const middleware = []
  const enhancers = []
  
  /* ------------- Redux Create ------------- */
  middleware.push(thunkMiddleware)

  enhancers.push(applyMiddleware(...middleware))

  enhancers.push(autoRehydrate())

  const store = createStore(
    rootReducer,
    compose(...enhancers))

  return store
}