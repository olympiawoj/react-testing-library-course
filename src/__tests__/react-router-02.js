// import React from 'react'
// import {Router} from 'react-router-dom'
// import {createMemoryHistory} from 'history'
// import {render, fireEvent} from '@testing-library/react'
// import {Main} from '../main'

// test('main renders about and home and I can navigate to those pages', () => {
//   const history = createMemoryHistory({initialEntries: ['/']})
//   const {getByRole, getByText} = render(
//     <Router history={history}>
//       <Main />
//     </Router>,
//   )
//   expect(getByRole('heading')).toHaveTextContent(/home/i)
//   fireEvent.click(getByText(/about/i))
//   expect(getByRole('heading')).toHaveTextContent(/about/i)
// })

// test('landing on a bad page shows no match component', () => {
//   const history = createMemoryHistory({
//     initialEntries: ['/something-that-does-not-match'],
//   })
//   const {getByRole} = render(
//     <Router history={history}>
//       <Main />
//     </Router>,
//   )
//   expect(getByRole('heading')).toHaveTextContent(/404/i)
// })

import React from 'react'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history' // create my own history and specify initial entries for history
import {render, fireEvent} from '@testing-library/react'
import {Main} from '../main'

test('main renders about and home and I can navigate to those pages', () => {
  const history = createMemoryHistory({
    initialEntries: ['/'], // home page
  })
  const {getByRole, getByText, debug} = render(
    <Router history={history}>
      <Main />
    </Router>,
  )

  expect(getByRole('heading')).toHaveTextContent(/home/i)
  debug()
  fireEvent.click(getByText(/about/i))
  debug()
  expect(getByRole('heading')).toHaveTextContent(/about/i)
})

test('landing on a bad page shows no match component', () => {
  const history = createMemoryHistory({
    initialEntries: ['/something-that-does-not-match'], // page does NOT have a route associated with it
  })
  const {getByRole, debug} = render(
    <Router history={history}>
      <Main />
    </Router>,
  )

  debug()
  expect(getByRole('heading')).toHaveTextContent(/404/i) // verify that 404 page shows up
})
