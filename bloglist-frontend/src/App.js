import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('info')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification('tervetuloa käyttäjä ' + user.name)
      setNotificationType('info')
      setTimeout(() => {
        setNotification(null)
      }, 2000)
    } catch (exception) {
      setNotification('väärä käyttäjänimi tai salasana')
      setNotificationType('error')
      setTimeout(() => {
        setNotification(null)
      }, 2000)
    }
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setNotification('käyttäjä ' + user.name + ' kirjautui ulos')
    setNotificationType('info')
    setTimeout(() => {
      setNotification(null)
    }, 2000)
    setUser(null)
  }

  if (user === null) {
    return (
      <div><Notification message={notification} type={notificationType} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification} type={notificationType} />
      <div>
        <h2>blogs</h2>
        <div>{user.name} logged in</div>
        <button onClick={handleLogout}>log out</button>
      </div>
      <BlogForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} setNotificationType={setNotificationType} />
      <BlogList blogs={blogs} setBlogs={setBlogs} />
    </div>
  )
}

export default App