import { useState } from "react"
import { useMutation } from "@apollo/client/react"
import Select from "react-select"

import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries"

const Authors = ({ authors }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: selectedAuthor.value, setBornTo: born } })

    setSelectedAuthor(null)
    setBorn('')
  }

  const options = authors.map(a => ({
    value: a.name,
    label: a.name
  }))

  return (
    <div>
      <div className="py-10">
        <h2 className="py-4 text-xl font-bold">authors</h2>
        <table className="min-w-full">
          <tbody className="bg-gray-100">
            <tr>
              <th></th>
              <th className="text-left">born</th>
              <th className="text-left">books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="py-5">
        <form className="space-y-4" onSubmit={submit}>
          <div>
            <Select
              defaultValue={selectedAuthor}
              onChange={setSelectedAuthor}
              options={options}
            />
          </div>
          <div>
            born
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(Number(target.value))}
              className='ml-2 border'
            />
          </div>
          <button
            type="submit"
            className='border px-1 bg-blue-300 hover:bg-blue-400'
            >
            update author
        </button>
        </form>      
      </div>      
    </div>
  )
}

export default Authors
