import { useState } from "react"

const Books = ({ books }) => {
  const [selectedGenre, setSelectedGenre] = useState("")

  const genres = Array.from(new Set(books.flatMap(b => b.genres)))

  const filteredBooks = selectedGenre
    ? books.filter(b => b.genres.includes(selectedGenre))
    : books
    
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
          {filteredBooks.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      filter:
      <select
        value={selectedGenre}
        onChange={({ target }) => setSelectedGenre(target.value)}
        className="ml-2 mt-10 border"
      >
        <option value="">---</option>
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
