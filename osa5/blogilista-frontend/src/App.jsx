import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
        setErrorMessage('wrong username or password')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))   
      setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage('error adding blog: ', error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)      
    }
  }

  const handleLikeClick = async (blog) => {
    try {
      const returnedBlog = await blogService.update(
        blog.id, {...blog, likes: blog.likes + 1}
      )
      setBlogs(blogs.map(b => b.id === blog.id ? returnedBlog : b))
    } catch (exception) {
        console.log(exception)
    }
  }

  const handleRemoveClick = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setSuccessMessage(`Removed ${blog.title} by ${blog.author}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)        
      }
    } catch (exception) {
        console.log(exception)
        setErrorMessage('Error removing blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000) 
    }
  }

  const sortBlogsByLikes = (blogs) => {
    return [...blogs].sort((a, b) => b.likes - a.likes)
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
  

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      {!user && loginForm()}
      {user && <div>
       {user.name} logged in
       <button onClick={handleLogout}>logout</button>

        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <BlogForm
            createBlog={addBlog}
          />
        </Togglable>

      {sortBlogsByLikes(blogs).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleLikeClick={handleLikeClick}
          handleRemoveClick={handleRemoveClick}
        />
      )}
      </div>
      }
    </div>
  )
}

export default App