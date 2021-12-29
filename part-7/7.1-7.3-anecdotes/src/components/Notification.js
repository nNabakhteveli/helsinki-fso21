
import React from 'react'
import { useSelector } from 'react-redux'


const Notification = () => {
  const notification = useSelector(state => state.anecdote.votedAnecdote);

  let time = useSelector(state => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return typeof notification !== "undefined" && time < 5 ? 
    <div style={style}>
      {
        `you voted: "${notification.content}"`
      }
    </div> 
    : null; 
}

export default Notification