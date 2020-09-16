// import React from 'react'
// import {Router} from 'react-router-dom'
// import {createMemoryHistory} from 'history'
// import {render as rtlRender, fireEvent} from '@testing-library/react'
// import {Main} from '../main'

// // normally you'd put this logic in your test utility file so it can be used
// // for all of your tests.
// function render(
//   ui,
//   {
//     route = '/',
//     history = createMemoryHistory({initialEntries: [route]}),
//     ...renderOptions
//   } = {},
// ) {
//   function Wrapper({children}) {
//     return <Router history={history}>{children}</Router>
//   }
//   return {
//     ...rtlRender(ui, {
//       wrapper: Wrapper,
//       ...renderOptions,
//     }),
//     // adding `history` to the returned utilities to allow us
//     // to reference it in our tests (just try to avoid using
//     // this to test implementation details).
//     history,
//   }
// }

// test('main renders about and home and I can navigate to those pages', () => {
//   const {getByRole, getByText} = render(<Main />)
//   expect(getByRole('heading')).toHaveTextContent(/home/i)
//   fireEvent.click(getByText(/about/i))
//   expect(getByRole('heading')).toHaveTextContent(/about/i)
//   // you can use the `within` function to get queries for elements within the
//   // about screen
// })

// test('landing on a bad page shows no match component', () => {
//   const {getByRole} = render(<Main />, {
//     route: '/something-that-does-not-match',
//   })
//   expect(getByRole('heading')).toHaveTextContent(/404/i)
// })

import React from 'react'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history' // create my own history and specify initial entries for history
import {render as rtlRender, fireEvent} from '@testing-library/react'
import {Main} from '../main'

function render(
  ui,
  {
    route = '/',
    history = createMemoryHistory({initialEntries: [route]}), // ppl can provide their own history if they want, if they don't then it will default to this
    ...renderOptions
  } = {},
) {
  // const history = createMemoryHistory({
  //   initialEntries: [route], // home page
  // })
  function Wrapper({children}) {
    return <Router history={history}>{children}</Router>
  }

  return {
    ...rtlRender(
      ui,
      {
        wrapper: Wrapper,
        ...renderOptions,
      },
      history,
    ),
  } // return history so ppl can make assertions on history if they want
}

test('main renders about and home and I can navigate to those pages', () => {
  const {getByRole, getByText, debug} = render(<Main />)

  expect(getByRole('heading')).toHaveTextContent(/home/i)
  debug()
  fireEvent.click(getByText(/about/i))
  debug()
  expect(getByRole('heading')).toHaveTextContent(/about/i)
})

test('landing on a bad page shows no match component', () => {
  const {getByRole, debug} = render(<Main />, {
    route: '/something-that-does-not-match',
  })

  debug()
  expect(getByRole('heading')).toHaveTextContent(/404/i) // verify that 404 page shows up
})
