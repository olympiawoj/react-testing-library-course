// import React from 'react'
// import {render, fireEvent} from '@testing-library/react'
// import {reportError as mockReportError} from '../api'
// import {ErrorBoundary} from '../error-boundary'

// jest.mock('../api')

// beforeAll(() => {
//   jest.spyOn(console, 'error').mockImplementation(() => {})
// })

// afterAll(() => {
//   console.error.mockRestore()
// })

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
//   const {rerender, getByText, queryByText, getByRole, queryByRole} = render(
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

//   expect(console.error).toHaveBeenCalledTimes(2)

//   expect(getByRole('alert').textContent).toMatchInlineSnapshot(
//     `"There was a problem."`,
//   )

//   console.error.mockClear()
//   mockReportError.mockClear()

//   rerender(
//     <ErrorBoundary>
//       <Bomb />
//     </ErrorBoundary>,
//   )

//   fireEvent.click(getByText(/try again/i))

//   expect(mockReportError).not.toHaveBeenCalled()
//   expect(console.error).not.toHaveBeenCalled()
//   expect(queryByRole('alert')).not.toBeInTheDocument()
//   expect(queryByText(/try again/i)).not.toBeInTheDocument()
// })

import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {reportError as mockReportError} from '../api' // communicates what reportError is so alias as mockReportError which needs to have a mock implementation
import {ErrorBoundary} from '../error-boundary'

jest.mock('../api') // mock out so we don't make API calls in our test, default mock finds ALL functions exported from api module  & replaces with jest functions

// before all of the tests run, let's mock console.error implementation to do nothing
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

// clean up after all tests finish
afterAll(() => {
  console.error.mockRestore() //restore console.error to original implementation
  console.error('hi') // here I will get error output
})

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
  const {rerender, getByText, getByRole, queryByRole, queryByText} = render(
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
  expect(console.error).toHaveBeenCalledTimes(2) // once by jest-dom, once by react-dom

  expect(getByRole('alert').textContent).toMatchInlineSnapshot(
    `"There was a problem."`,
  ) // render alert when error was thrown

  console.error.mockClear()
  mockReportError.mockClear() // resets calls to 0, leaves mock implementation

  rerender(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  )
  fireEvent.click(getByText(/try again/i))
  expect(mockReportError).not.toHaveBeenCalled()
  expect(console.error).not.toHaveBeenCalled()
  expect(queryByRole('alert')).not.toBeInTheDocument()
  expect(queryByText(/try again/i)).not.toBeInTheDocument()
})
