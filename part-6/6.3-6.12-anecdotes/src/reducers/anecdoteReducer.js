
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

export const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

// Simple sort
const sortArray = (arr) => {
  let highestVote = 0;
  for(let i = 0; i < arr.length; i++) {
    if(arr[i].votes > highestVote) {
      highestVote = arr[i].votes;
      let iIndex = arr.indexOf(arr[i]), splicedObj = arr.splice(iIndex, 1);
      arr.unshift(splicedObj[0]);
    }
  }
}

const getAnecdote = (stateData, votedAnecdoteId) => {
  for(const i of stateData) {
    if(i.id === votedAnecdoteId) {
      i.votes += 1;
      sortArray(stateData);
      stateData.votedAnecdote = i;
      return stateData;
    }
  }
  return stateData;
}

const reducer = (state = initialState, action) => {
  const stateInstance = [ ...state ];
  console.log(action);

  switch(action.type) {
    case "VOTE":
      return getAnecdote(stateInstance, action.id);
      
    case "ADD_ANECDOTE":
      return [ ...state, action.data ];
    } 
  return state
}

export default reducer