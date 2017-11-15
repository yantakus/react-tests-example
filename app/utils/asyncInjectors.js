// @flow

import createReducer from 'reducers'
import type { Store } from 'types/common'

/**
 * Inject an asynchronously loaded reducer
 */
export function injectAsyncReducer (store: Store) {
  return function injectReducer (name: string, asyncReducer: Function) {
    if (name in store.asyncReducers) return

    store.asyncReducers[name] = asyncReducer
    store.replaceReducer(createReducer(store.asyncReducers))
  }
}

/**
 * Inject an asynchronously loaded saga
 */
export function injectAsyncSagas (store: Store) {
  return function injectSagas (sagas: [Function]) {
    // return redux-saga Tasks, so they can be canceled on router events
    return sagas.map(store.runSaga)
  }
}

/**
 * Helper for creating injectors
 */
export function getAsyncInjectors (store: Store) {
  return {
    injectReducer: injectAsyncReducer(store),
    injectSagas: injectAsyncSagas(store)
  }
}
