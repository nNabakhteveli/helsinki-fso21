import React, { useState } from 'react'

const App = () => {
   const anecdotes = [
     'If it hurts, do it more often',
     'Adding manpower to a late software project makes it later!',
     'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
     'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
     'Premature optimization is the root of all evil.',
     'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
     'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
     'The best way to get a project done faster is to start sooner',
     'Even the best planning is not so omniscient as to get it right the first time.',
     'How does a project get to be a year late?... One day at a time.',
     'The bearing of a child takes nine months, no matter how many women are assigned. Many software tasks have this characteristic because of the sequential nature of debugging.',
     'Perfection (in design) is achieved not when there is nothing more to add, but rather when there is nothing more to take away.'
   ];
   
   const [selected, setSelected] = useState(0);
   const [mostVoted, setMostVoted] = useState(0);
   const [votes, setVotes] = useState({
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0
   });

   const selectRandom = () => setSelected(Math.floor(Math.random() * anecdotes.length));

   const voteAnecdote = () => {
      let votesInstance = {...votes};
      votesInstance[selected]++;
      let arr = Object.entries(votesInstance);
      let highestNum = votes[mostVoted];

      for(const i of arr) {
         if(i[1] > highestNum) {
            highestNum = +i[1];
            setMostVoted(+i[0]);
         }         
      }
      setVotes({...votesInstance});
   }

   return (
      <div>
         <h1>Anecdote of the day</h1>
         <p>{anecdotes[selected]}</p>
         <p>Has {votes[selected]} votes</p>

         <button onClick={voteAnecdote}>Vote</button>
         <button onClick={selectRandom}>Next anecdote</button>

         <h1>Anecdote with most votes</h1>
         <p> {anecdotes[mostVoted]}</p>
      </div>
   )
}

export default App
