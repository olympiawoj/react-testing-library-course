// import React from 'react'
// import {render} from '@testing-library/react'
// import user from '@testing-library/user-event'
// import {submitForm as mockSubmitForm} from '../api'
// import App from '../app-reach-router'

// jest.mock('../api')

// test('Can fill out a form across multiple pages', async () => {
//   mockSubmitForm.mockResolvedValueOnce({success: true})
//   const testData = {food: 'test food', drink: 'test drink'}
//   const {findByLabelText, findByText} = render(<App />)

//   user.click(await findByText(/fill.*form/i))

//   user.type(await findByLabelText(/food/i), testData.food)
//   user.click(await findByText(/next/i))

//   user.type(await findByLabelText(/drink/i), testData.drink)
//   user.click(await findByText(/review/i))

//   expect(await findByLabelText(/food/i)).toHaveTextContent(testData.food)
//   expect(await findByLabelText(/drink/i)).toHaveTextContent(testData.drink)

//   user.click(await findByText(/confirm/i, {selector: 'button'}))

//   expect(mockSubmitForm).toHaveBeenCalledWith(testData)
//   expect(mockSubmitForm).toHaveBeenCalledTimes(1)

//   user.click(await findByText(/home/i))

//   expect(await findByText(/welcome home/i)).toBeInTheDocument()
// })

// keep implmenetation details out of integration tests by changing to app-reach-router
import React from 'react'
import {render} from '@testing-library/react'

import user from '@testing-library/user-event' // user is going to replace fireEvent and fire a bunch of events on ALL elements we're interacting with
import {submitForm as mockSubmitForm} from '../api'
// import App from '../app'
import App from '../app-reach-router' // all tests pass as well

// mock our API so we don't make real HTTP calls
jest.mock('../api')

// findBy is asynchronous

test('Can fill out a form across multiple pages', async () => {
  mockSubmitForm.mockResolvedValueOnce({success: true})
  const testData = {food: 'test food', drink: 'test drink'}
  const {findByLabelText, findByText, debug} = render(<App />)

  // click on fill out form
  user.click(await findByText(/fill.*form/i))
  // user.change(await findByLabelText(/food/i), {
  //   target: {value: testData.food},
  // })
  user.type(await findByLabelText(/food/i), testData.food)

  // move to next page
  user.click(await findByText(/next/i))
  user.type(await findByLabelText(/drink/i), testData.drink)

  user.click(await findByText(/review/i))
  expect(await findByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(await findByLabelText(/drink/i)).toHaveTextContent(testData.drink)

  user.click(await findByText(/confirm/i, {selector: 'button'})) // multiple elements with confirm, showing up in h2 as well as button
  // scope await findByText to elements with css selector button
  expect(mockSubmitForm).toHaveBeenCalledWith(testData)
  expect(mockSubmitForm).toHaveBeenCalledTimes(1)
  // asynchronous waiting for Homepage link to show up
  // after mock request has been made, we get congrats you did it
  // await it to go home
  user.click(await findByText(/home/i))

  expect(await findByText(/welcome home/i)).toBeInTheDocument()

  debug()
})
