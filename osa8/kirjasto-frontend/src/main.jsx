import { BrowserRouter as Router } from "react-router-dom"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import { ApolloProvider } from "@apollo/client/react"
import { SetContextLink } from "@apollo/client/link/context"

const authLink = new SetContextLink((prevContext, operation) => {
  const token = localStorage.getItem('library-user-token')
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})

const httpLink = new HttpLink({
  uri: "http://localhost:4000"
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})


ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
)
