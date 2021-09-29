import React, { useState } from 'react'

const StatisticLine = props => {
   return (
      <table>
         <tbody>
            <tr>
               <td>{props.name}</td>
               <td>{props.stat}</td> 
            </tr>
         </tbody>
      </table>
   );
}

const Statistics = props => {
   if(!props.voted) 
      return <p>No feedback given</p>  
   
   return (
      <div>
         <StatisticLine name="Good" stat={props.good} />
         <StatisticLine name="Neutral" stat={props.neutral} />
         <StatisticLine name="Bad" stat={props.bad} />
         <StatisticLine name="All" stat={props.all} />
         <StatisticLine name="Average" stat={props.average / props.clicks} />
         <StatisticLine name="Positive" stat={`${props.good * (100 / props.clicks)}%`} />
      </div>
   );
}

const Button = ({ handleFeedback, text }) => <button onClick={handleFeedback}>{text}</button>

const App = () => {
   const [good, setGood] = useState(0);
   const [neutral, setNeutral] = useState(0);
   const [bad, setBad] = useState(0);
   const [all, setAll] = useState(0);
   const [clicks, setClicks] = useState(0);
   const [average, setAverage] = useState(0);

   const hasVoted = clicks > 0 ? true : false;

   const handleGood = () => {
      setGood(good + 1); 
      setAll(all + 1);
      setClicks(clicks + 1);
      setAverage(average + 1);
   }
   
   const handleNeutral = () => {
      setNeutral(neutral + 1);
      setClicks(clicks + 1);
      setAll(all + 1);
   }
   
   const handleBad = () => { 
      setBad(bad + 1); 
      setAll(all + 1);
      setClicks(clicks + 1);
      setAverage(average - 1);
   }

   return(
      <div>
         <h2>Give feedback</h2>
         <Button handleFeedback={handleGood} text="Good" />
         <Button handleFeedback={handleNeutral} text="Neutral" />
         <Button handleFeedback={handleBad} text="Bad" />

         <h2>Statistics</h2>
         <Statistics voted={hasVoted} good={good} neutral={neutral} bad={bad} all={all} average={average} clicks={clicks} />
      </div>
   );
}

export default App