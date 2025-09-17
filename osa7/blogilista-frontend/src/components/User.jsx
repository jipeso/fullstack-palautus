import { useMatch } from "react-router-dom"
import { useSelector } from "react-redux"

const User = () => {
  const user = useSelector(state => state.user.loggedUser)
  const match = useMatch('/users/:id')
  const blogs = useSelector(state => state.blogs)

  if (!user) {
    return null
  }

  const userBlogs = blogs.filter(blog => blog.user.id === match.params.id)

  if (userBlogs.length === 0) {
    return 
  }

  return (
    <div>
      <h2>{userBlogs[0].user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userBlogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User