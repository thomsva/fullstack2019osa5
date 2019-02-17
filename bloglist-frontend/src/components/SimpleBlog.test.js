import React from 'react'
//import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

//afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Hello blog',
    author: 'Aku Ankka',
    likes: '123456',
    url: 'www.www.www'
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  //component.debug()

  expect(component.container).toHaveTextContent('Hello blog')

  const likesDiv = component.container.querySelector('.likes')
  expect(likesDiv).toHaveTextContent('123456')

  const titleDiv = component.container.querySelector('.title')
  expect(titleDiv).toHaveTextContent('Aku Ankka')


})