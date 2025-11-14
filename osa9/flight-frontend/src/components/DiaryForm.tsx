import React, { useState } from "react";
import type { DiaryFormProps } from "../types";

const DiaryForm = ({ addDiary, errorMessage }: DiaryFormProps) => {
  const [newDate, setNewDate ] = useState('')
  const [newWeather, setNewWeather] = useState('')
  const [newVisibility, setNewVisibility] = useState('')
  const [newComment, setNewComment] = useState('')

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    addDiary({
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    })

    setNewDate('')
    setNewWeather('')
    setNewVisibility('')
    setNewComment('')
  }

  return (
    <div>
      <h2>Add new entry</h2>
      {errorMessage && 
        <p style={{ color: 'red' }}>{errorMessage}</p>
      }
      <form onSubmit={handleSubmit}>
        <div>
          date
          <input
            type="date"
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)}
          />          
        </div>

        <br />
        <div>
          weather
          <input
            type="radio"
            name="weather"
            onChange={() => setNewWeather('sunny')}
          />
          sunny
          <input
            type="radio"
            name="weather"
            onChange={() => setNewWeather('rainy')}
          />
          rainy
          <input
            type="radio"
            name="weather"
            onChange={() => setNewWeather('cloudy')}
          />
          cloudy
          <input
            type="radio"
            name="weather"
            onChange={() => setNewWeather('stormy')}
          />
          stormy
          <input
            type="radio"
            name="weather"
            onChange={() => setNewWeather('windy')}
          />   
          windy         
        </div>
                              
        <br />

        <div>
          visibility
          <input
            type="radio"
            name="visibility"
            onChange={() => setNewVisibility('great')}
          />
          great
          <input
            type="radio"
            name="visibility"
            onChange={() => setNewVisibility('good')}
          />
          good
          <input
            type="radio"
            name="visibility"
            onChange={() => setNewVisibility('ok')}
          />
          ok
          <input
            type="radio"
            name="visibility"
            onChange={() => setNewVisibility('poor')}
          /> 
          poor                             
        </div>

        <br />
        comment
        <input
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <br />
        <button type="submit">add</button>                 
      </form>
    </div>
  )
}

export default DiaryForm;