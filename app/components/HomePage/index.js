// @flow

import React from 'react'
import { FormattedMessage } from 'react-intl'

const HomePage = () =>
  <div className='row column'>
    <h1>
      <FormattedMessage
        id='containers.HomePage.mainText'
        defaultMessage='This is HomePage component'
      />
    </h1>
  </div>

export default HomePage
