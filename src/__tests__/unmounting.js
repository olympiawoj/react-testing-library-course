// import React from 'react'
// import {render, act} from '@testing-library/react'
// import {Countdown} from '../countdown'

// beforeAll(() => {
//   jest.spyOn(console, 'error').mockImplementation(() => {})
// })

// afterAll(() => {
//   console.error.mockRestore()
// })

// afterEach(() => {
//   jest.clearAllMocks()
//   jest.useRealTimers()
// })

// test('does not attempt to set state when unmounted (to prevent memory leaks)', () => {
//   jest.useFakeTimers()
//   const {unmount} = render(<Countdown />)
//   unmount()
//   act(() => jest.runOnlyPendingTimers())
//   expect(console.error).not.toHaveBeenCalled()
// })

import React from 'react'
import {render, act} from '@testing-library/react'
import {Countdown} from '../countdown'

beforeAll(() => {
  // mock implmenetation of console.error to do nothing, to keep console clean
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

// to keep our tests isolated from each other
afterAll(() => {
  console.error.mockRestore()
})

// clean up
afterEach(() => {
  jest.clearAllMocks()
  jest.useRealTimers()
})

test('does not attempt to set state when unmounted (to prevent memory leaks)', () => {
  // use jest.useFakeTimers() to make this go quicker
  jest.useFakeTimers()
  const {unmount} = render(<Countdown />)
  unmount()
  act(() => jest.runOnlyPendingTimers()) // use act when using jest fake timers
  expect(console.error).not.toHaveBeenCalled()
})
