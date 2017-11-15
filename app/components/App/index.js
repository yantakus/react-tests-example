// @flow

/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react'
import withProgressBar from 'components/ProgressBar'

type Props = {
  children: HTMLElement
}

const App = ({ children }: Props) =>
  <div className='wrapper'>
    {React.Children.toArray(children)}
  </div>

export default withProgressBar(App)
