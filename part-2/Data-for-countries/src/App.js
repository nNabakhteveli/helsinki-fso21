import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SingleDescription = ({ arr }) => {
	const [weatherResponse, setWeatherResponse] = useState({});
	const [isloaded, setLoaded] = useState(false);
	
	useEffect(() => {
		const APIKey = process.env.REACT_APP_API_KEY;

		axios.get(`http://api.weatherstack.com/current?access_key=${APIKey}&query=${arr.capital}`).then(response => {
			setLoaded(false);
			setWeatherResponse(response.data);
			setLoaded(true);
		})
	}, [arr]);
	
	return(
		<div>
			<h2>{arr.name.common}</h2>
			<p>Capital: {arr.capital}</p>
			<p>Population: {arr.population}</p>
			<h2>Languages</h2>
			<ul>
				{Object.entries(arr.languages).map(value => <li key={value[0]}>{value[1]}</li>)}
			</ul>
			<img src={arr.flags.png} width={120} alt="Flag" />

			<h2>Weather in {arr.capital}</h2>
			<p>Temperature: {isloaded ? weatherResponse.current.temperature : "Wait to load the data"} Celsius</p>
			<img src={isloaded ? weatherResponse.current.weather_icons[0] : ""} width={90} alt="Weather icon" />
			{isloaded ? 
				<p>Wind: {weatherResponse.current.wind_speed} mph, Direction - {weatherResponse.current.wind_dir}</p>
				: 
				<p>Wait to load the data</p>
			}
		</div>
	);
}

const HandleFilter = ({ arr, input }) => {
	const [renderSingle, setRenderSingle] = useState(false);
	const [single, setSingle] = useState([]);
	let res = [];

	useEffect(() => { 
		setRenderSingle(false);
	}, [arr]);

	for(const i of arr) {
		if(arr.length > 10) {
			return <p>Too many matches, specify another filter</p>
		} else if(input.length === 0) return null;

		res.push(
			<div key={i.altSpellings[0]}>
				<p>{i.name.common}</p>
				<button onClick={() => { setRenderSingle(true); setSingle(i) }}>show</button>
			</div>
		);
	}

	for(const j of arr) 
		if(input === j.name.common || arr.length === 1) return <SingleDescription arr={j} />	
	
	if(!renderSingle) {
		return res;
	} else {
		return <SingleDescription arr={single} />
	}	
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