import App from '../index'

import { shallow, mount } from 'enzyme'
import React from 'react'

describe('<App />', () => {
  it('should render wrapper', () => {
    const renderedComponent = mount(
      <App />
    )
    expect(renderedComponent.find('.wrapper').length).toEqual(1)
  })
  it('should render its children', () => {
    const children = (<h1>Test</h1>)
    const renderedComponent = shallow(
      <App>
        {children}
      </App>
    )
    expect(renderedComponent.contains(children)).toBe(true)
  })
})
