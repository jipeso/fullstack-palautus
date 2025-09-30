import { useQuery, useApolloClient } from "@apollo/client/react"
import { useState } from "react"
import { Routes, Route, Link } from "react-router-dom"

import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import Notify from "./components/Notify"

import { ALL_AUTHORS, ALL_BOOKS } from "./queries"

const App = () => {
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  if (authors.loading || books.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div className="p-4">
      <div>
        <Link to="/" className="inline-block px-4 py-2 border hover:bg-gray-200">authors</Link>
        <Link to="/books" className="inline-block px-4 py-2 border hover:bg-gray-200">books</Link>
        {token ? (
          <>
            <Link to="/add" className="inline-block px-4 py-2 border hover:bg-gray-200">add book</Link>
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
        <Route path="/books" element={<Books books={books.data.allBooks}/>} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/login" element={<LoginForm setToken={setToken} setError={notify}/>} />
      </Routes>
    </div>
  )
}

export default App
