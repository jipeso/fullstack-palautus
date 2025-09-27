import { useMutation } from '@apollo/client/react'
import { useState } from 'react'

import { CREATE_BOOK, ALL_BOOKS } from '../queries'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }]
  })

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: { title, published, author, genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div className="py-10">
      <form className="space-y-4" onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className='ml-2 border'
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            className='ml-2 border'
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
            className='ml-2 border'
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
            className='border'
          />
          <button
            onClick={addGenre}
            type="button"
            className='ml-2 border px-1 bg-gray-100 hover:bg-gray-200'
            >
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button
          type="submit"
          className='border px-1 bg-blue-300 hover:bg-blue-400'
          >
          create book
        </button>
      </form>
    </div>
  )
}

export default NewBook