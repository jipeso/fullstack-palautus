import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      {anecdote.content} <br />
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>      
    </li>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === 'ALL') {
      return anecdotes
    }
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })

  return (
    <div>
      <ul>
        {anecdotes.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => {
              dispatch(voteAnecdote(anecdote.id))
              dispatch(setNotification(`you voted '${anecdote.content}'`, 5))              
            }}
          />
        )}
      </ul>      
    </div>
  )
}

export default AnecdoteList