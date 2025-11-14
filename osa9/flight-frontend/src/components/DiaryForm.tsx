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
        date
        <input
          value={newDate}
          onChange={(event) => setNewDate(event.target.value)}
        />
        <br />
        weather
        <input
          value={newWeather}
          onChange={(event) => setNewWeather(event.target.value)}
        />
        <br />
        visibility
        <input
          value={newVisibility}
          onChange={(event) => setNewVisibility(event.target.value)}
        />
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