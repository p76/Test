import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  /* ------------- Redux Create ------------- */
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk))


  return store
}