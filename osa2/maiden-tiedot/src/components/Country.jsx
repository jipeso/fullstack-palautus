import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Country = ({ country }) => {
    const [weatherData, setWeatherData] = useState(null)
    const langs = Object.values(country.languages)


    useEffect(() => {
        weatherService
            .getWeather(country.capital)
            .then(returnedWeather => {
                setWeatherData(returnedWeather)
            })
            .catch(error => {
                console.log(error)
            })
    }, [country])

    return (
        <div>
            {country && (
                <div>
                    <h1>{country.name.common}</h1>
                    <p>capital {country.capital}</p>
                    <p>area {country.area}</p>
                    <h2>languages:</h2>
                    <ul>
                        {langs.map(language => (
                            <li key={language}>{language}</li>
                        ))}
                    </ul> 
                    <img src={country.flags.png} />
                </div>                
            )}

            {weatherData && (
                <div>
                    <h2>Weather in {country.capital}</h2>
                    <p>temperature {weatherData.main.temp} Celcius</p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
                    <p>wind {weatherData.wind.speed} m/s</p>
                </div>               
            )}

        </div>
    )
}

export default Country