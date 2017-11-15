import React from 'react'
import renderer from 'react-test-renderer'
import Spinner from '../index'

test('Spinner matches the snapshot', () => {
  const component = renderer.create(
    <Spinner />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
