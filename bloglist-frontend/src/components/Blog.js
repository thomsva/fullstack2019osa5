import React, { useState } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const extractUserName = (user) => {
    if (user == null) return 'unknown'
    return user.name
  }

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const details = { display: showDetails ? '' : 'none' }

  return (
    <div className='blog'>
      <div onClick={toggleShowDetails}>{blog.title} by {blog.author}</div>
      <div style={details}>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>likes: {blog.likes} <button>like</button> </div>
        <div>added by {extractUserName(blog.user)}</div>
      </div>
    </div >
  )
}

export default Blog