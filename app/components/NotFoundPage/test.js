import { shallow } from 'enzyme'
import React from 'react'

import { FormattedMessage } from 'react-intl'
import NotFound from './index'

describe('<NotFound />', () => {
  it('should render the Page Not Found text', () => {
    const renderedComponent = shallow(
      <NotFound />
    )
    expect(renderedComponent.contains(
      <h1>
        <FormattedMessage
          id='containers.NotFoundPage.mainText'
          defaultMessage='This is NotFound page'
        />
      </h1>)).toEqual(true)
  })
})
