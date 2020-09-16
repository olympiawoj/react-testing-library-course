// import React from 'react'
// import {render} from '@testing-library/react'
// import {reportError as mockReportError} from '../api'
// import {ErrorBoundary} from '../error-boundary'

// jest.mock('../api')

// afterEach(() => {
//   jest.clearAllMocks()
// })

// function Bomb({shouldThrow}) {
//   if (shouldThrow) {
//     throw new Error('💣')
//   } else {
//     return null
//   }
// }

// test('calls reportError and renders that there was a problem', () => {
//   mockReportError.mockResolvedValueOnce({success: true})
//   const {rerender} = render(
//     <ErrorBoundary>
//       <Bomb />
//     </ErrorBoundary>,
//   )

//   rerender(
//     <ErrorBoundary>
//       <Bomb shouldThrow={true} />
//     </ErrorBoundary>,
//   )

//   const error = expect.any(Error)
//   const info = {componentStack: expect.stringContaining('Bomb')}
//   expect(mockReportError).toHaveBeenCalledWith(error, info)
//   expect(mockReportError).toHaveBeenCalledTimes(1)
// })

// // this is only here to make the error output not appear in the project's output
// // even though in the course we don't include this bit and leave it in it's incomplete state.
// beforeEach(() => {
//   jest.spyOn(console, 'error').mockImplementation(() => {})
// })

// afterEach(() => {
//   console.error.mockRestore()
// })

// /*
// eslint
//   jest/prefer-hooks-on-top: off
// */

import React from 'react'
import {render} from '@testing-library/react'
import {reportError as mockReportError} from '../api' // communicates what reportError is so alias as mockReportError which needs to have a mock implementation
import {ErrorBoundary} from '../error-boundary'

jest.mock('../api') // mock out so we don't make API calls in our test, default mock finds ALL functions exported from api module  & replaces with jest functions

afterEach(() => {
  jest.clearAllMocks() // ensures all mocks we have by default from API have all been cleared after every one of the tests
})

// test ONLY component, Bomb
function Bomb({shouldThrow}) {
  if (shouldThrow) {
    throw new Error('💣')
  } else {
    return null
  }
}

test('calls reportError and renders that there was a problem', () => {
  mockReportError.mockResolvedValueOnce({success: true}) // returns a promise, so mock resolve value- mock out to w/e server shiould be responding with
  // ensures our mock of function resolves to success: true
  const {rerender} = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  ) // render with Bomb component
  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow={true} />
    </ErrorBoundary>,
  ) // when we do this, we makes a call to reportError, throw error, componentDidCatch should run, re render with error info

  const error = expect.any(Error) // asymmetric matcher
  const info = {componentStack: expect.stringContaining('Bomb')}
  expect(mockReportError).toHaveBeenCalledWith(error, info)
  expect(mockReportError).toHaveBeenCalledTimes(1)
})
