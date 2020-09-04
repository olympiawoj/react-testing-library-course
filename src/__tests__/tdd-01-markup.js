// import React from 'react'
// import {render} from '@testing-library/react'
// import {Editor} from '../post-editor-01-markup'

// test('renders a form with title, content, tags, and a submit button', () => {
//   const {getByLabelText, getByText} = render(<Editor />)
//   getByLabelText(/title/i)
//   getByLabelText(/content/i)
//   getByLabelText(/tags/i)
//   getByText(/submit/i)
// })

import React from 'react' // need React to create the Editor element
import {render} from '@testing-library/react' // to render the Editor element
import {Editor} from '../post-editor-01-markup' // import the Editor element

test('renders a form with title, content, tags, and a submit button', () => {
  const {getByLabelText, getByText} = render(<Editor />)
  getByLabelText(/title/i)
  getByLabelText(/content/i)
  getByLabelText(/tags/i)
  getByText(/submit/i)
})
