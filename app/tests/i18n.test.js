import React from 'react'
import { shallow } from 'enzyme'
import { FormattedMessage, defineMessages } from 'react-intl'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { IntlProvider } from 'react-intl-redux'
import { translationMessages } from '../i18n'
import { DEFAULT_LOCALE } from '../constants'
import configureStore from '../store'

const initialState = {
  intl: {
    locale: DEFAULT_LOCALE,
    messages: translationMessages
  }
}
const store = configureStore(initialState, browserHistory)

describe('<IntlProvider />', () => {
  it('should render the default language messages', () => {
    const messages = defineMessages({
      someMessage: {
        id: 'some.id',
        defaultMessage: 'This is some default message'
      }
    })
    const renderedComponent = shallow(
      <Provider store={store}>
        <IntlProvider intlSelector={{}}>
          <FormattedMessage {...messages.someMessage} />
        </IntlProvider>
      </Provider>
    )
    expect(renderedComponent.contains(<FormattedMessage {...messages.someMessage} />)).toBe(true)
  })
})
