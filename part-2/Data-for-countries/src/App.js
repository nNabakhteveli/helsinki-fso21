import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SingleDescription = ({ arr }) => {
	return(
		<div>
			<h2>{arr.name.common}</h2>
			<p>Capital: {arr.capital}</p>
			<p>Population: {arr.population}</p>
			<h2>Languages</h2>
			<ul>
				{Object.entries(arr.languages).map(value => <li key={value[0]}>{value[1]}</li>)}
			</ul>
			<img src={arr.flags.png} width={120} alt="Flag"></img>
		</div>
	);
}

const HandleFilter = ({ arr, input }) => {
	let res = [];
	for(const i of arr) {
		if(arr.length > 10) {
			return "\nToo many matches, specify another filter"
		} else if(arr.length <= 10 && arr.length > 1) {
			res.push(i);
		} else if(input.length === 0) return null;
	}

	for(const j of arr) {
		if(input === j.name.common) {
			console.log(j.name.common, j);
			return <SingleDescription arr={j} />		
		}
	}

	return res.map(value => <p key={value.altSpellings[0]}>{value.name.common}</p>)
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
			<HandleFilter arr={result} input={input} />
		</div>
	);
}

export default App