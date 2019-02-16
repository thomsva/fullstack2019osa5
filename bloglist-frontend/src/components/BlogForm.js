import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import blogs from '../services/blogs';

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
        setNotification('lisääminen onnistui, blogeja yhteensä: ' + blogs.length + 'kpl')
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
    <div>
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
    </div>
  )
}

export default BlogForm