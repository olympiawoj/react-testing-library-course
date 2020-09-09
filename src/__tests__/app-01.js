// import React from 'react'
// import {render, fireEvent} from '@testing-library/react'
// import {submitForm as mockSubmitForm} from '../api'
// import App from '../app'

// jest.mock('../api')

// test('Can fill out a form across multiple pages', async () => {
//   mockSubmitForm.mockResolvedValueOnce({success: true})
//   const testData = {food: 'test food', drink: 'test drink'}
//   const {getByLabelText, getByText, findByText} = render(<App />)

//   fireEvent.click(getByText(/fill.*form/i))

//   fireEvent.change(getByLabelText(/food/i), {
//     target: {value: testData.food},
//   })
//   fireEvent.click(getByText(/next/i))

//   fireEvent.change(getByLabelText(/drink/i), {
//     target: {value: testData.drink},
//   })
//   fireEvent.click(getByText(/review/i))

//   expect(getByLabelText(/food/i)).toHaveTextContent(testData.food)
//   expect(getByLabelText(/drink/i)).toHaveTextContent(testData.drink)

//   fireEvent.click(getByText(/confirm/i, {selector: 'button'}))

//   expect(mockSubmitForm).toHaveBeenCalledWith(testData)
//   expect(mockSubmitForm).toHaveBeenCalledTimes(1)

//   fireEvent.click(await findByText(/home/i))

//   expect(getByText(/welcome home/i)).toBeInTheDocument()
// })

import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {submitForm as mockSubmitForm} from '../api'
import App from '../app'

// mock our API so we don't make real HTTP calls
jest.mock('../api')

test('Can fill out a form across multiple pages', async () => {
  mockSubmitForm.mockResolvedValueOnce({success: true})
  const testData = {food: 'test food', drink: 'test drink'}
  const {getByLabelText, getByText, debug, findByText} = render(<App />)

  // click on fill out form
  fireEvent.click(getByText(/fill.*form/i))
  fireEvent.change(getByLabelText(/food/i), {target: {value: testData.food}})

  // move to next page
  fireEvent.click(getByText(/next/i))
  fireEvent.change(getByLabelText(/drink/i), {target: {value: testData.drink}})

  fireEvent.click(getByText(/review/i))
  expect(getByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(getByLabelText(/drink/i)).toHaveTextContent(testData.drink)

  fireEvent.click(getByText(/confirm/i, {selector: 'button'})) // multiple elements with confirm, showing up in h2 as well as button
  // scope getByText to elements with css selector button
  expect(mockSubmitForm).toHaveBeenCalledWith(testData)
  expect(mockSubmitForm).toHaveBeenCalledTimes(1)
  // asynchronous waiting for Homepage link to show up
  // after mock request has been made, we get congrats you did it
  // await it to go home
  fireEvent.click(await findByText(/home/i))

  expect(getByText(/welcome home/i)).toBeInTheDocument()

  debug()
})
