import React from 'react'
import {render, act} from '@testing-library/react'
import {useCounter} from '../use-counter'

// options object, destructure initialProps
// set up function takes initial props fwd to useCounter hook
function setup({initialProps} = {}) {
  const result = {}
  function TestComponent(props) {
    result.current = useCounter(props)
    return null
  }
  render(<TestComponent {...initialProps} />)
  return result
}

test('exposes the count and increment/decrement functions', () => {
  const result = setup()
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('alows customization of the initial count', () => {
  // let result
  // function TestComponent() {
  //   result = useCounter({initialCount: 3})
  //   return null
  // }
  const result = setup({initialProps: {initialCount: 3}})
  // render(<TestComponent />)
  expect(result.current.count).toBe(3)
})

test('allows customization of the step', () => {
  // let result
  // function TestComponent() {
  //   result = useCounter({step: 2})
  //   return null
  // }
  const result = setup({initialProps: {step: 2}})
  // render(<TestComponent/>)
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})
