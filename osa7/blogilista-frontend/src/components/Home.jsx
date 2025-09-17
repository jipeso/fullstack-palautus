import { useRef } from "react"
import { useSelector } from "react-redux"

import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import BlogList from "./BlogList"

const Home = () => {
  const user = useSelector(state => state.user.loggedUser)
  const blogFormRef = useRef()

  return (
    <div>
      {user && (
        <div>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <BlogList />
        </div>
      )}
    </div>
  )}

export default Home