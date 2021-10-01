import React from 'react';

const Total = ({ arr }) => {
   let exercisesArr = arr.map(value => value.exercises);

   return <b>Total of {exercisesArr.reduce((a, b) => a + b)} exercises</b>
};

const DisplayContent = ({ arr }) => (
   arr.map(value => <p key={value.id}>Tite: {value.name} - {value.exercises} exercises</p>)
);

const Course = props => {
   return (
      <div>
         <h1>{props.course.name}</h1>

         <h3>Parts:</h3>
         <DisplayContent arr={props.course.parts} />
         <Total arr={props.course.parts} />
      </div>
   );
}

const App = () => {
   const course = {
      id: 1,
      name: 'Half Stack application development',
      parts: [
         {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
         },

         {
           name: 'Using props to pass data',
           exercises: 7,
           id: 2
          },

         {
            name: 'State of a component',
            exercises: 14,
            id: 3
         },
         
         {
            name: 'Redux',
            exercises: 11,
            id: 4
         }
      ]
   }
   return <Course course={course} />
}

export default App;
