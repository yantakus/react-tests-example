// @flow

import React, { Component } from 'react'
import ProgressBar from './ProgressBar'

type Props = {
  location: Object,
  router: Object
}

function withProgressBar (WrappedComponent: ReactClass<{}>) {
  class AppWithProgressBar extends Component {
    props: Props

    unsubscribeHistory: ?Object

    state = {
      progress: -1,
      loadedRoutes: this.props.location && [this.props.location.pathname]
    }

    componentWillMount () {
      // Store a reference to the listener.
      /* istanbul ignore next */
      this.unsubscribeHistory = this.props.router && this.props.router.listenBefore((location) => {
        // Do not show progress bar for already loaded routes.
        if (this.state.loadedRoutes.indexOf(location.pathname) === -1) {
          this.updateProgress(0)
        }
      })
    }

    componentWillUpdate (newProps: Object, newState: Object) {
      const { loadedRoutes, progress } = this.state
      const { pathname } = newProps.location

      // Complete progress when route changes. But prevent state update while re-rendering.
      if (loadedRoutes.indexOf(pathname) === -1 && progress !== -1 && newState.progress < 100) {
        this.updateProgress(100)
        this.setState({
          loadedRoutes: loadedRoutes.concat([pathname])
        })
      }
    }

    componentWillUnmount () {
      // Unset unsubscribeHistory since it won't be garbage-collected.
      this.unsubscribeHistory = undefined
    }

    updateProgress = (progress: number) => {
      this.setState({ progress })
    }

    render () {
      return (
        <div className='withProgressBar'>
          <ProgressBar percent={this.state.progress} updateProgress={this.updateProgress} />
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }

  return AppWithProgressBar
}

export default withProgressBar
