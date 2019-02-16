import React, { useState } from 'react'
import Togglable from './Togglable'
import blogService from "../services/blogs"

const Blog = ({ blog, setBlogs }) => {
  const [showDetails, setShowDetails] = useState(false)

  const extractUserName = (user) => {
    if (user == null) return 'unknown'
    return user.name
  }

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = () => {
    blog.likes++
    blogService
      .update(blog)
      .then((response) => {
        console.log('response', response)
      })
      .then(() => {
        blogService.getAll().then(blogs =>
          setBlogs(blogs)
        )
      })


  }

  const details = { display: showDetails ? '' : 'none' }

  return (
    <div className='blog'>
      <div onClick={toggleShowDetails}>{blog.title} by {blog.author}</div>
      <div style={details}>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>likes: {blog.likes} <button onClick={handleLike}>like</button> </div>
        <div>added by {extractUserName(blog.user)}</div>
      </div>
    </div >
  )
}

export default Blog