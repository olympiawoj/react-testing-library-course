import React from 'react'
import {render, fireEvent} from '@testing-library/react'
/* The fireEvent API/utility in React Testing Library lets you test all the events that 
you regularly use in the web (change, click, etc.). 
 */
import {FavoriteNumber} from '../favorite-number'

test('entering an invalid value shows an error message', () => {
  const {getByLabelText, getByRole} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  // We need to fire a change event because we're listening to onChange
  // pass a value onto the target, the value that we want to set this number to
  // now input has a value of 10
  fireEvent.change(input, {target: {value: '10'}})
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
})
