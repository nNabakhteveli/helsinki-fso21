import React from 'react'
import { getId } from './reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'


const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()


  const vote = id => dispatch({ type: "VOTE", id });

  const addAnecdote = event => {
    event.preventDefault();

    dispatch({ 
      type: "ADD_ANECDOTE", 
      data: {
        content: event.target.anecdoteInput.value,
        id: getId(),
        votes: 0
      }
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input type="text" name="anecdoteInput" />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App