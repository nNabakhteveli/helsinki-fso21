

export const getId = () => (100000 * Math.random()).toFixed(0)

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

const reducer = (state = [], action) => {
  const stateInstance = [ ...state ];
  console.log(action);

  switch(action.type) {
    case "VOTE":
      return getAnecdote(stateInstance, action.id);
      
    case "ADD_ANECDOTE":
      return [ ...state, action.data ];

    case "INIT_DATA":
      return action.data.data;
      
    default: return state;
    } 
}

export default reducer