import { useState, useEffect } from "react"
import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS } from "../queries"

const Books = () => {
  const [genre, setGenre] = useState("")
  const [genres, setGenres] = useState([])

  const books = useQuery(ALL_BOOKS, {
    variables: { genre: ""},
    fetchPolicy: 'cache-and-network'
  })

  const filteredBooks = useQuery(ALL_BOOKS, {
    variables: { genre },
    fetchPolicy: 'cache-and-network'
  })

  useEffect(() => {
    if (books.data && !books.loading) {
      const allGenres = Array.from(
        new Set(books.data.allBooks.flatMap(b => b.genres))
      )
      setGenres(allGenres)
    }
  }, [books.data, books.loading])

  if (books.loading || filteredBooks.loading) {
    return <div>loading...</div>
  }
    
  const booksToShow = filteredBooks.data.allBooks

  return (
    <div className="py-10">
      <h2 className="py-4 text-xl font-bold">books</h2>
      <table className="min-w-full">
        <tbody className="bg-gray-100">
          <tr>
            <th></th>
            <th className="text-left">author</th>
            <th className="text-left">published</th>
          </tr>
          {booksToShow.map(b => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      filter:
      <select
        value={genre}
        onChange={({ target }) => setGenre(target.value)}
        className="ml-2 mt-10 border"
      >
        <option value="">all genres</option>
        {genres.map(g => (
          <option key={g}>
            {g}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Books
