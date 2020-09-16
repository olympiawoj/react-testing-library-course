// import React from 'react'
// import {render, fireEvent, wait} from '@testing-library/react'
// import {Redirect as MockRedirect} from 'react-router'
// import {savePost as mockSavePost} from '../api'
// import {Editor} from '../post-editor-04-router-redirect'

// jest.mock('react-router', () => {
//   return {
//     Redirect: jest.fn(() => null),
//   }
// })

// jest.mock('../api')

// afterEach(() => {
//   jest.clearAllMocks()
// })

// test('renders a form with title, content, tags, and a submit button', async () => {
//   mockSavePost.mockResolvedValueOnce()
//   const fakeUser = {id: 'user-1'}
//   const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
//   const fakePost = {
//     title: 'Test Title',
//     content: 'Test content',
//     tags: ['tag1', 'tag2'],
//   }
//   getByLabelText(/title/i).value = fakePost.title
//   getByLabelText(/content/i).value = fakePost.content
//   getByLabelText(/tags/i).value = fakePost.tags.join(', ')
//   const submitButton = getByText(/submit/i)

//   fireEvent.click(submitButton)

//   expect(submitButton).toBeDisabled()

//   expect(mockSavePost).toHaveBeenCalledWith({
//     ...fakePost,
//     authorId: fakeUser.id,
//   })
//   expect(mockSavePost).toHaveBeenCalledTimes(1)

//   await wait(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
// })

import React from 'react' // need React to create the Editor element
import {render, fireEvent, wait} from '@testing-library/react' // to render the Editor element
import {Redirect as MockRedirect} from 'react-router'
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor-04-router-redirect' // import the Editor element

// mock out react router bc we need a fake Redirect component, we faked that out to be a jest mock function
jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null), // jest mock function
  }
})

jest.mock('../api')

afterEach(() => {
  jest.clearAllMocks() // all mocks called are cleared between every test so tests remain isolated
})

// bc were using wait, turn test into async test
test('renders a form with title, content, tags, and a submit button', async () => {
  mockSavePost.mockResolvedValueOnce() // returning a promise that resolves
  const fakeUser = {id: 'user-1'}
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
  const fakePost = {
    title: 'Test Title',
    content: 'Test content',
    tags: ['tag1', 'tag2'],
  }
  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(',')
  const submitButton = getByText(/submit/i)
  fireEvent.click(submitButton)
  expect(submitButton).toBeDisabled()
  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id,
  }) // post data
  expect(mockSavePost).toHaveBeenCalledTimes(1)
  await wait(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
  expect(MockRedirect).toHaveBeenCalledTimes(1)
})
