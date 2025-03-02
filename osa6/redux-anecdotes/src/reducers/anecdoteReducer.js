import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      const changedAnecdote = action.payload
      return state.map(anecdote => 
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
      ) 
    }
  }
})

export const voteAnecdote = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.voteFor(id)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer