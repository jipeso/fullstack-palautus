const Filter = ({ bookFilter, handleFilterChange }) => {
  return (
    <div>
        filter shown with
        <input
          value={bookFilter}
          onChange={handleFilterChange}
        />
    </div>    
  )
}

export default Filter