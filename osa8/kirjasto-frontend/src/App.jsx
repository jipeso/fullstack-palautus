import { useQuery, useApolloClient, useSubscription } from "@apollo/client/react"
import { useState } from "react"
import { Routes, Route, Link, useNavigate} from "react-router-dom"

import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import Recommendations from "./components/Recommendations"

import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries"

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = a => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook))
    }
  })
}

const App = () => {
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const navigate = useNavigate()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      alert(`${addedBook.title} added`)

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  if (authors.loading || books.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate("/")
  }

  return (
    <div className="p-4">
      <div>
        <Link to="/" className="inline-block px-4 py-2 border hover:bg-gray-200">authors</Link>
        <Link to="/books" className="inline-block px-4 py-2 border hover:bg-gray-200">books</Link>
        {token ? (
          <>
            <Link to="/add" className="inline-block px-4 py-2 border hover:bg-gray-200">add book</Link>
            <Link to="/recommendations" className="inline-block px-4 py-2 border hover:bg-gray-200">recommendations</Link>
            <button
              onClick={logout}
              className="inline-block px-4 py-2 border font-bold bg-red-200 hover:bg-red-300"
            >
              logout
            </button>
          </>
        ) : (
          <Link to="/login" className="inline-block px-4 py-2 border font-bold bg-green-200 hover:bg-green-300">
            login
          </Link>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Authors authors={authors.data.allAuthors}/>} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/login" element={<LoginForm setToken={setToken} navigate={navigate}/>} />
        <Route path="/recommendations" element={<Recommendations books={books.data.allBooks} />} />
      </Routes>
    </div>
  )
}

export default App
