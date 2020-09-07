// import React from 'react'
// import {createStore} from 'redux'
// import {Provider} from 'react-redux'
// //rtlRender = reactTestingLibrary render
// import {render as rtlRender, fireEvent} from '@testing-library/react'
// import {Counter} from '../redux-counter'
// import {reducer} from '../redux-reducer'

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState or the entire store that the ui is rendered with
// function render(
//   ui,
//   {
//     initialState,
//     store = createStore(reducer, initialState),
//     ...renderOptions
//   } = {},
// ) {
//   function Wrapper({children}) {
//     return <Provider store={store}>{children}</Provider>
//   }
//   return {
//     ...rtlRender(ui, {
//       wrapper: Wrapper,
//       ...renderOptions,
//     }),
//     // adding `store` to the returned utilities to allow us
//     // to reference it in our tests (just try to avoid using
//     // this to test implementation details).
//     store,
//   }
// }

// test('can increment the value', () => {
//   const {getByLabelText, getByText} = render(<Counter />)
//   fireEvent.click(getByText('+'))
//   expect(getByLabelText(/count/i)).toHaveTextContent('1')
// })

// test('can decrement the value', () => {
//   const {getByLabelText, getByText} = render(<Counter />, {
//     initialState: {count: 3},
//   })
//   fireEvent.click(getByText('-'))
//   expect(getByLabelText(/count/i)).toHaveTextContent('2')
// })

import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {render as rtlRender, fireEvent} from '@testing-library/react' //rtlRender = react testing library render
import {Counter} from '../redux-counter'
// import {store as appStore} from '../redux-store'
import {reducer} from '../redux-reducer'

// utility
// we did this to make it easier throughout our codebase ANYTIME we're testing a component that's connected to redux
function render(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...rtlOptions
  } = {},
) {
  function Wrapper({children}) {
    return <Provider store={store}>{children}</Provider>
  }

  return {
    ...rtlRender(ui, {wrapper: Wrapper, ...rtlOptions}),
    store,
  }
}

test('can render with redux with defaults', () => {
  const {getByLabelText, getByText} = render(<Counter />)
  fireEvent.click(getByText('+'))
  expect(getByLabelText(/count/i)).toHaveTextContent('1')
})

test('can render with redux with custom initial state', () => {
  // const store = createStore(reducer, {count: 3}) // count 3 is initial state
  const {getByLabelText, getByText} = render(<Counter />, {
    initialState: {count: 3},
  })
  fireEvent.click(getByText('-'))
  expect(getByLabelText(/count/i)).toHaveTextContent('2')
})
