import React, { useEffect } from 'react'
import Notification from './components/Notification'
import { getId } from './reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


const CreateAnecdote = ({ addingHandler }) => {
  return(
    <form onSubmit={addingHandler}>
      <h2>create new</h2>
      <div>
        <input type="text" name="anecdoteInput" />
      </div>
      <Link to="/"><button type='submit'>create</button></Link>
    </form>
  );
}

const Navbar = () => {
  const style = { margin: '5px' }
  return(
    <nav>
      <Link to="/" style={style}>Home</Link>
      <Link to="/anecdotes" style={style}>Anecdotes</Link>
      <Link to="/new-anecdote" style={style}>Create new</Link>
    </nav>
  );
}

const App = () => {
  const anecdotes = useSelector(state => state.anecdote);
  let filterData = useSelector(state => state.filter);

  if(filterData == 0) filterData = anecdotes;
  
  const dispatch = useDispatch()
  
  useEffect(async () => {
    const response = await axios.get('http://localhost:3001/anecdotes');
    dispatch({
      type:"INIT_DATA",
      data: response
    })
  }, []);

  
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

    const newAnecdoteData = {
      content: event.target.anecdoteInput.value,
      id: getId(),
      votes: 0
    }

    axios.post('http://localhost:3001/anecdotes', newAnecdoteData);
    
    dispatch({ 
      type: "ADD_ANECDOTE", 
      data: newAnecdoteData
    })
  }

  return (
    <Router>
      <h1>Software anecdotes</h1>
      <Navbar />
      <div>
        <Notification />
        <Routes>
          <Route path="/" element={
            <div>
              <h1>Anecdotes</h1>
              <ul>
                {anecdotes.map((value, key) => <li key={key}><Link to={`/anecdotes/${value.id}`}>{value.content}</Link></li>)}
              </ul>
            </div>
          } />
          <Route path="/anecdotes" element={
            <div>
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
            </div>
          } />
        <Route path='/new-anecdote' element={<CreateAnecdote addingHandler={e => addAnecdote} />} />
        
        </Routes>
        <p>Anecdote app for Full Stack Open. See <a href="https://github.com/nNabakhteveli/helsinki-fso21/tree/main/part-6/" target='_blank'>https://github.com/nNabakhteveli/helsinki-fso21/tree/main/part-6/</a>  for the source code.</p>
      </div>
    </Router>
  )
}

export default App