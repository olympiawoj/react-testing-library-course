// import React from 'react'
import {renderHook, act} from '@testing-library/react-hooks'
import {useCounter} from '../use-counter'

// options object, destructure initialProps
// set up function takes initial props fwd to useCounter hook
// function setup({initialProps} = {}) {
//   const result = {}
//   function TestComponent(props) {
//     result.current = useCounter(props)
//     return null
//   }
//   render(<TestComponent {...initialProps} />)
//   return result
// }

test('exposes the count and increment/decrement functions', () => {
  // const result = setup()
  const {result} = renderHook(useCounter)
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('alows customization of the initial count', () => {
  // const result = setup({initialProps: {initialCount: 3}})
  const {result} = renderHook(useCounter, {initialProps: {initialCount: 3}})
  expect(result.current.count).toBe(3)
})

test('allows customization of the step', () => {
  // const result = setup({initialProps: {step: 2}})
  const {result} = renderHook(useCounter, {initialProps: {step: 2}})
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})
