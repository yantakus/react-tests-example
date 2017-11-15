// @flow

export type Action = {
  type: string,
  payload: any,
  meta: any
}

export type State = {
  set: Function,
  mergeIn: Function
}

export type Store = {
  dispatch: Function,
  subscribe: Function,
  getState: Function,
  replaceReducer: Function,
  runSaga: Function,
  asyncReducers: Object
}
