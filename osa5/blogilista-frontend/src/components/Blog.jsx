import { useState } from 'react'

const Blog = ({
  blog,
  user,
  handleLikeClick,
  handleRemoveClick
}) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleExpanded}>{expanded ? 'hide' : 'show'}</button>
      </div>
      {expanded && <div>
          {blog.url} <br />
          likes {blog.likes} 
          <button onClick={() => handleLikeClick(blog)}>like</button> <br />
          {blog.user.name} <br />

          {blog.user.username === user.username &&
            <button onClick={() => handleRemoveClick(blog)}>remove</button>
          }
      </div>
      }
    </div>    
  )
}

export default Blog