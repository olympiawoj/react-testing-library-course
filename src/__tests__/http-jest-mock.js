// import React from 'react'
// import {render, fireEvent, wait} from '@testing-library/react'
// import {loadGreeting as mockLoadGreeting} from '../api'
// import {GreetingLoader} from '../greeting-loader-01-mocking'

// jest.mock('../api')

// test('loads greetings on click', async () => {
//   const testGreeting = 'TEST_GREETING'
//   mockLoadGreeting.mockResolvedValueOnce({data: {greeting: testGreeting}})
//   const {getByLabelText, getByText} = render(<GreetingLoader />)
//   const nameInput = getByLabelText(/name/i)
//   const loadButton = getByText(/load/i)
//   nameInput.value = 'Mary'
//   fireEvent.click(loadButton)
//   expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
//   expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
//   await wait(() =>
//     expect(getByLabelText(/greeting/i)).toHaveTextContent(testGreeting),
//   )
// })

import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react' // wait is an async utility
import {loadGreeting as mockLoadGreeting} from '../api' // mocked version of loadGreeting
import {GreetingLoader} from '../greeting-loader-01-mocking'

jest.mock('../api')

test('loads greetings on click', async () => {
  const testGreeting = 'TEST_GREETING'
  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: testGreeting}})
  const {getByLabelText, getByText} = render(<GreetingLoader />)
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = 'Mary'
  fireEvent.click(loadButton) // when we click loadButton, we make a call to loadGreeting in the api module & ultimately it makes a server request
  // we don't want to do that in a test, so let's let's mock this loadGreeting module
  // now when we click, we make a request to mockLoadGreeting

  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  await wait(() =>
    expect(getByLabelText(/greeting/i)).toHaveTextContent(testGreeting),
  ) // wait is an async function so await it - checking if greeting is in DOM node
})
