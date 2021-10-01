import React from 'react';

const Total = ({ arr }) => {
    let exercisesArr = arr.map(value => value.exercises);
    
    return <b>Total of {exercisesArr.reduce((a, b) => a + b)} exercises</b>
};

export default Total;
