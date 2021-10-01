import React from 'react';

const Total = ({ arr }) => {
   let exercisesArr = arr.map(value => value.exercises);
   
   return <b>Total of {exercisesArr.reduce((a, b) => a + b)} exercises</b>
};

const DisplayContent = ({ arr }) => arr.map(value => <p key={value.id}>Tite: {value.name} - {value.exercises} exercises</p>);

const Course = props => {
   return (
      <>
         {props.course.map(value => (
            <div key={value.id}>
               <h1>{value.name}</h1>

               <h3>Parts:</h3>
               <DisplayContent arr={value.parts} /> 
               <Total arr={value.parts} /> 
            </div>
         ))}
      </>
   );
}

const App = () => {
   const courses = [
      {
        name: 'Half Stack application development',
        id: 1,
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
      }, 

      {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]

   return <Course course={courses} />
}

export default App;
