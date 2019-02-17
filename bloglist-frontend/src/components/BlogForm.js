import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import blogs from '../services/blogs';
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const BlogForm = ({ blogs, setBlogs, setNotification, setNotificationType }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    const blog = {
      'author': newAuthor,
      'title': newTitle,
      'url': newUrl
    }
    blogService
      .create(blog)
      .then(response => {
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
        setBlogs(blogs.concat(response))
        setNotification('lisääminen onnistui')
        console.log('blogs', blogs)
        setNotificationType('info')
        setTimeout(() => {
          setNotification(null)
        }, 2000)
      })
      .catch(error => {
        setNotification('blogin lisääminen epäonnistui')
        setNotificationType('error')
        setTimeout(() => {
          setNotification(null)
        }, 2000)
      })
  }

  return (
    <Togglable buttonLabel="new blog">
      <h2>Luo uusi blogi</h2>
      <form onSubmit={createBlog}>
        <div>Author<input
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        /></div>
        <div>Title<input
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
        /></div>
        <div>Url<input
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
        /></div>
        <button type="submit">tallenna</button>
      </form>
    </Togglable>
  )
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  setNotificationType: PropTypes.func.isRequired
}

export default BlogForm