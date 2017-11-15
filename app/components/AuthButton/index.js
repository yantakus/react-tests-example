// @flow

import React from 'react'
import { Trigger } from 'react-formal'
import AuthButton from './AuthButton'

const AuthButtonWrapper = (props: Object) =>
  <Trigger group='@all'>
    {({ messages }) =>
      <AuthButton
        {...props}
        messages={messages}
      />
    }
  </Trigger>

export default AuthButtonWrapper
