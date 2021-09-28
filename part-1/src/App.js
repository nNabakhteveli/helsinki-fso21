import React, { useState } from 'react'

const Button = ({ handler, text }) => <button onClick={handler}>{text}</button>

const App = () => {
   const [counter, setCounter] = useState(0);
   const increment = () => setCounter(counter + 10);
   const decrement = () => setCounter(counter - 5);
   const setZero = () => setCounter(0);

   return (
      <div>
         <h1>Click counter</h1>
         <h2>{counter}</h2>
         <Button handler={increment} text="Increment" />
         <Button handler={decrement} text="Decrement" />
         <Button handler={setZero} text="Zero" />
      </div>
   );
}

export default App