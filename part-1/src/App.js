import React, { useState } from 'react'


const App = (props) => {
   const [counter, setCounter] = useState(0);
   const handleClick = () => {
      setCounter(counter + 10);
   }

   return (
      <div>
         <p>Hi</p>
         <h2>{counter}</h2>
         <button onClick={handleClick}>Increment</button>
      </div>
   )
}

export default App