const Books = ({ books }) => {

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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
