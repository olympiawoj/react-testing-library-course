import React from 'react'
import {render, within, queries} from '@testing-library/react'
import {Modal} from '../modal'

test('modal shows the children', () => {
  // div is NOT appearing inside of the container that render creates for us
  // might think we need something special to get access to div
  // but getByTestId and all queries by DEFAULT are bound to document.body
  render(
    <>
      <div data-testid="foo" />
      <Modal>
        <div data-testid="test" />
      </Modal>
    </>,
  )

  // bound to this element rather than body
  const {getByTestId} = within(document.getElementById('modal-root')) // get specific queries within the modal root
  queries.getByTestId(document.body, 'foo') // container as 1st arg
  expect(getByTestId('test')).toBeInTheDocument()
})
