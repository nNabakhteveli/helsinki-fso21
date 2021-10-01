import React from 'react';
import DisplayContent from './DisplayContent';
import Total from './Total';

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

export default Course;