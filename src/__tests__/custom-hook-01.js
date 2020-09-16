import React from 'react'
import {render, act} from '@testing-library/react'
import {useCounter} from '../use-counter'

test('exposes the count and increment/decrement functions', () => {
  let result
  function TestComponent() {
    // hooks can only be inside a functional component
    result = useCounter()
    return null
  }
  render(<TestComponent />)
  expect(result.count).toBe(0)
  act(() => result.increment()) // state updates must happen INSIDE of act, re-exposes the act functino from react
  expect(result.count).toBe(1)
  act(() => result.decrement())
  expect(result.count).toBe(0)
})
