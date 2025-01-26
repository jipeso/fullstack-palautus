import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Country from './components/Country'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(fullCountries => {
        setAllCountries(fullCountries)        
      })
    }, [])

  useEffect(() => {
    const filtered = allCountries.filter(country => 
      country.name.common.toLowerCase().includes(searchValue.toLowerCase())
    )
    setFilteredCountries(filtered)
    setSelectedCountry(null)
    setMessage('')

    if (filtered.length === 1) {
      setSelectedCountry(filtered[0])
    }
    if (filtered.length > 10 && searchValue.length !== 0) {
      setMessage('Too many matches, specify another filter')
    }
  }, [searchValue])


  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }


  return (
    <div>
      <Filter 
      searchValue={searchValue} 
      handleSearchChange={handleSearchChange}
      />
      {message}

      <Countries
      countries={filteredCountries}
      handleShowCountry={handleShowCountry}
      />

      {selectedCountry !== null && (
        <Country country={selectedCountry} />        
      )}

    </div>

  )
}
export default App
