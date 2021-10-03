import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Display = ({ arr, input }) => {
	let res = [];
	for(const i of arr) {
		if(arr.length > 10) {
			return <p>Too many matches, specify another filter</p>
		} else if(arr.length <= 10 && arr.length > 1) {
			res.push(<p key={i.altSpellings[0]}>{i.name.common}</p>);
		} 
		else if(input.length === 0) return null;
	}
	return res;
}


const App = () => {
	const [countries, setCountries] = useState([]);
	const [input, setInput] = useState("");
	const [result, setResult] = useState([]);

	useEffect(() => {
		axios.get('https://restcountries.com/v3.1/all').then(response => {
			setCountries(response.data); 
		})
	}, []);


	const handleInput = (event) => {
		setInput(event.target.value);
		setResult([...countries].filter(val => val.name.common.includes(input)));
	}

	return (
		<div>
			Find countries <input onChange={handleInput} />
			<Display arr={result} input={input} />
		</div>
	);
}

export default App