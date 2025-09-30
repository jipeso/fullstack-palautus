const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div className="bg-red-100 border text-red-600 px-4 py3 rounded">
      {errorMessage}
    </div>
  )
}

export default Notify