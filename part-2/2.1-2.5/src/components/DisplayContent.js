import React from 'react';

const DisplayContent = ({ arr }) => arr.map(value => <p key={value.id}>Tite: {value.name} - {value.exercises} exercises</p>);

export default DisplayContent;