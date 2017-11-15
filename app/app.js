// @flow

/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
import 'babel-polyfill'

// Load the manifest.json file and the .htaccess
// $FlowFixMe
import '!file-loader?name=[name].[ext]!./manifest.json'
// $FlowFixMe
import 'file-loader?name=[name].[ext]!./.htaccess'

// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl-redux'
import { applyRouterMiddleware, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import FontFaceObserver from 'fontfaceobserver'
import { useScroll } from 'react-router-scroll'
import configureStore from './store'
import { DEFAULT_LOCALE } from './constants'

// Observe loading of Roboto (to remove Roboto, remove the <link> tag in
// the index.html file and this observer)
const robotoObserver = new FontFaceObserver('Roboto', {})

// When Roboto is loaded, add a font-family using Roboto to the body
robotoObserver.load().then(() => {
  document.body.classList.add('fontLoaded')
}, () => {
  document.body.classList.remove('fontLoaded')
})

// Import i18n messages
import { translationMessages } from './i18n'

// Import styles
import 'styles/all.scss'

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {
  intl: {
    locale: DEFAULT_LOCALE,
    messages: translationMessages
  }
}
const store = configureStore(initialState, browserHistory)

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
import { selectLocationState } from 'components/App/selectors'
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: selectLocationState()
})

// Set up the router, wrapping all Routes in the App component
import App from 'components/App'
import createRoutes from './routes'
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store)
}
const intlSelector = state => state.get('intl').toJS()

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <IntlProvider intlSelector={intlSelector}>
        <Router
          history={history}
          routes={rootRoute}
          render={
            // Scroll to top when going to a new page, imitating default browser
            // behaviour
            applyRouterMiddleware(useScroll())
          }
        />
      </IntlProvider>
    </Provider>,
    document.getElementById('app')
  )
}

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', () => {
    render()
  })
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(System.import('intl'))
  }))
    .then(() => Promise.all([
      System.import('intl/locale-data/jsonp/en.js'),
      System.import('intl/locale-data/jsonp/da.js')
    ]))
    .then(() => render())
    .catch((err) => {
      throw err
    })
} else {
  render()
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install()
}
