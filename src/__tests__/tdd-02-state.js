// import React from 'react'
// import {render, fireEvent} from '@testing-library/react'
// import {Editor} from '../post-editor-02-state'

// test('renders a form with title, content, tags, and a submit button', () => {
//   const {getByLabelText, getByText} = render(<Editor />)
//   getByLabelText(/title/i)
//   getByLabelText(/content/i)
//   getByLabelText(/tags/i)
//   const submitButton = getByText(/submit/i)

//   fireEvent.click(submitButton)

//   expect(submitButton).toBeDisabled()
// })

import React from 'react' // need React to create the Editor element
import {render, fireEvent} from '@testing-library/react' // to render the Editor element
import {Editor} from '../post-editor-02-state' // import the Editor element

test('renders a form with title, content, tags, and a submit button', () => {
  const {getByLabelText, getByText} = render(<Editor />)
  getByLabelText(/title/i)
  getByLabelText(/content/i)
  getByLabelText(/tags/i)
  const submitButton = getByText(/submit/i)
  fireEvent.click(submitButton)
  expect(submitButton).toBeDisabled()
})
