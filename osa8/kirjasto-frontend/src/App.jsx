import { useQuery } from "@apollo/client/react";
import { Routes, Route, Link } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

const App = () => {
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);

  if (authors.loading || books.loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="p-4">
      <div>
        <Link to="/" className="nav-link">authors</Link>
        <Link to="/books" className="nav-link">books</Link>
        <Link to="/add" className="nav-link">add book</Link>
      </div>
      <Routes>
        <Route path="/" element={<Authors authors={authors.data.allAuthors}/>} />
        <Route path="/books" element={<Books books={books.data.allBooks}/>} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;
