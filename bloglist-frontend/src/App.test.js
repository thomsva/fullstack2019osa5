import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('renders no blogs it gets from backend before logged in', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('div')
    )

    expect(component.container).toHaveTextContent('Log in to application')
    expect(component.container).not.toHaveTextContent('test blog')
    expect(component.container).not.toHaveTextContent('test author')


  })
})