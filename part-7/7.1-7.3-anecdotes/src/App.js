import React, { useEffect } from 'react'
import Notification from './components/Notification'
import { getId } from './reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import styled from 'styled-components'


const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`


const CreateAnecdote = ({ addingHandler }) => {
  return(
    <form onSubmit={addingHandler}>
      <h2>create new</h2>
      <div>
        <Input type="text" name="anecdoteInput" />
      </div>
      <a href='http://localhost:3000/'><Button type='submit'>create</Button></a>
    </form>
  );
}

const Navbar = () => {
  const style = { margin: '5px' }
  return(
    <Navigation>
      <Link to="/" style={style}>Home</Link>
      <Link to="/anecdotes" style={style}>Anecdotes</Link>
      <Link to="/new-anecdote" style={style}>Create new</Link>
    </Navigation>
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

  const addAnecdote = async event => {
    event.preventDefault();

    console.log("I got executed blin")
    const newAnecdoteData = {
      content: event.target.anecdoteInput.value,
      id: getId(),
      votes: 0
    }

    await axios.post('http://localhost:3001/anecdotes', newAnecdoteData);
    
    dispatch({ 
      type: "ADD_ANECDOTE", 
      data: newAnecdoteData
    })
  }

  return (
    <Page>
      <Router>
        <div className='container'>
        <Navbar />
        <h1>Software anecdotes</h1>
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
          <Route path='/new-anecdote' element={<CreateAnecdote addingHandler={addAnecdote} />} />
          
          </Routes>
          <Footer>
            <p>Anecdote app for Full Stack Open. See <a href="https://github.com/nNabakhteveli//helsinki-fso21/tree/main/part-6/" target='_blank'>https://github.com/nNabakhteveli/helsinki-fso21/tree/main/part-6/</a>  for the source code.</p>
          </Footer>
        </div>
      </Router>
    </Page>
  )
}

export default App