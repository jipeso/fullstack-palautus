const Filter = ({ searchValue, handleSearchChange }) => {
    return (
      <div>
          find countries
          <input
            value={searchValue}
            onChange={handleSearchChange}
          />
      </div>    
    )
  }
  
export default Filter