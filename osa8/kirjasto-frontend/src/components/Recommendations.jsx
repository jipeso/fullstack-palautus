import { useQuery } from "@apollo/client/react"
import { ME } from "../queries"

const Recommendations = ({ books }) => {
  const loggedUser = useQuery(ME)

  if (loggedUser.loading) {
    return <div>loading...</div>
  }
  const favoriteGenre = loggedUser.data.me.favoriteGenre

  const genreBooks = favoriteGenre
    ? books.filter(b => b.genres.includes(favoriteGenre))
    : books
    
  return (
    <div className="py-10">
      <h2 className="py-4 text-xl font-bold">recommendations</h2>

      books in your favorite genre {favoriteGenre ? <b>{favoriteGenre}</b> : <b>none</b>}
      <table className="min-w-full">
        <tbody className="bg-gray-100">
          <tr>
            <th></th>
            <th className="text-left">author</th>
            <th className="text-left">published</th>
          </tr>
          {genreBooks.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
