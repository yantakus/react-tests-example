// @flow

// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors'
import type { Store } from 'types/common'

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err)
}

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default)
}

export default function createRoutes (store: Store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store)

  const createRoute = (path, name, component, sagas, cancelSagas) => {
    type Route = {
      path: string,
      name: string,
      getComponent: Function,
      onEnter?: Function,
      onLeave?: Function,
      loadedSagas?: Array<Object>,
    }

    const route: Route = {
      path,
      name,
      getComponent (nextState: Object, cb: Function) {
        const importModules = Promise.all([component, sagas])
        const renderRoute = loadModule(cb)
        importModules.then(([component, sagas]) => {
          if (sagas) {
            injectReducer(name, sagas.reducer) // a saga module must export the reducer as `export const reducer = (...) => ...`
          }
          renderRoute(component)
        })
        importModules.catch(errorLoading)
      }
    }
    if (sagas) {
      route.onEnter = function (nextState: Object, replace: Function, callback: Function) {
        // onEnter gets called when we visit a route
        // childRoute changes do not trigger onEnter, which is a desired behavior
        const importModules = sagas
        if (importModules != null) {
          importModules.then((importedSagas) => {
            this.loadedSagas = injectSagas(importedSagas.default)
            callback()
          })
          importModules.catch(errorLoading)
        }
      }.bind(route)
      if (cancelSagas) {
        route.onLeave = function () {
        // onLeave gets called when we leave the route
        // Cancel the sagas if they are running
          if (this.loadedSagas) {
            this.loadedSagas.forEach((saga) => saga.cancel())
            delete this.loadedSagas
          }
        }.bind(route)
      }
    }
    return route
  }

  return [
    createRoute(
      '/',
      'home',
      System.import('components/HomePage')
    ),
    createRoute(
      '*',
      'notfound',
      System.import('components/NotFoundPage')
    )
  ]
}
