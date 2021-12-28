import React from 'react'
import Notification from './components/Notification'
import { getId } from './reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'


const App = () => {
  const anecdotes = useSelector(state => state.anecdote);
  let filterData = useSelector(state => state.filter);

  if(filterData == 0) filterData = anecdotes;
  
  const dispatch = useDispatch()
  
  const handleFilter = event => {
    let arr = anecdotes.filter(value => value.content.includes(event.target.value));
    dispatch({
      type: "FILTER",
      data: [...arr]  
    })
  }

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const vote = async id => {
    dispatch({ type: "VOTE", id });
    
    let i = 0;
    while(i !== 5) {
      if(i <= 5) {
        dispatch({ type: "INCREMENT" });
        i++;
        await delay(1000);  
      }
    }
  };

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
      <Notification />
      <h2>Anecdotes</h2>
      <b>Filter</b> <input type="text" name="filterInput" onChange={handleFilter} />
      {filterData.map(anecdote =>
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