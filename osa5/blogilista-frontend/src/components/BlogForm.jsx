import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog =  async (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          type="text"
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
          data-testid='title-input'
          id='title-input'
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
          data-testid='author-input'
          id='author-input'
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
          data-testid='url-input'
          id='url-input'
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm