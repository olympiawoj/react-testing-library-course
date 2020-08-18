import React from 'react'
import {render} from '@testing-library/react'
import {axe, toHaveNoViolations} from 'jest-axe' // specific assertion
import 'jest-axe/extend-expect' //extension happens automatically

// expect.extend(toHaveNoViolations)

// input is not labeled
// function InaccessibleForm() {
//   return (
//     <form>
//       <input placeholder="email" />
//     </form>
//   )
// }

function AccessibleForm() {
  return (
    <form>
      <label htmlFor="email">Email</label>
      <input id="email" placeholder="email" />
    </form>
  )
}

test('the form is accessible', async () => {
  const {container} = render(<AccessibleForm />)
  // console.log(container.innerHTML)
  const results = await axe(container) //async function, returns a promise, pass in container DOM node to axe
  // console.log(results)
  expect(results).toHaveNoViolations()
})
