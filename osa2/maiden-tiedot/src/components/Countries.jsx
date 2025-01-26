const Countries = ({ countries, handleShowCountry }) => {

  if (countries.length === 1 || countries.length > 10) {
    return null
  }

  return (
    <div>
      <ul>
        {countries.map(country => (
          <li key={country.cca3}>
            {country.name.common}
            <button onClick={() => handleShowCountry(country)}>
              show
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Countries