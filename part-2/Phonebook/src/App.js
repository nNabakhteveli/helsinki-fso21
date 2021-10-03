import React, { useState, useEffect } from 'react'
import axios from 'axios';


const DisplayPeople = ({ arr }) => arr.map(person => <p key={person.id}>{person.name} {person.number}</p>)

const PersonForm = props => {
	return(
		<form onSubmit={props.submit}>
			<div>
				name: <input value={props.name} onChange={props.nameHandler} />
			</div>
			<div>
				number: <input value={props.number} onChange={props.numberHandler} />
			</div>
			<div>
			  <button type="submit">add</button>
			</div>
	 	</form>
	);
}

const Filter = ({ filterHandler }) => <> Filter with name <input onChange={filterHandler} /> </>

const App = () => {
	const [ persons, setPersons ] = useState([]); 
	const [ newName, setNewName ] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filterArr, setFilter] = useState(persons);

	useEffect(() => {
		axios.get('http://localhost:3001/persons').then(response => {
			setPersons(response.data);
			setFilter(response.data);
		})
	}, []);

	
	const filterPeople = (event) => {
		let i = event.target.value, array = [];
		for(const person of persons) {
			if(person.name.includes(i)) {
				array.push(person);
			}
		}
		setFilter(array);
	}

	const handleSubmit = e => {
		e.preventDefault();
		
		for(const i of persons) {
			if(newName === i.name) {
				alert(`${i.name} is already added to phonebook`);
				return;
			} 
		}

		let updatedArr = [...persons, { name: newName, number: newNumber, id: persons.length + 1 }];
		setPersons(updatedArr);
		setFilter(updatedArr);
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filterHandler={filterPeople} />

			<h2>Add a new</h2>
			<PersonForm submit={handleSubmit} 
				name={newName} number={newNumber} 
				nameHandler={(e) => setNewName(e.target.value)} 
				numberHandler={(e) => setNewNumber(e.target.value)} 
			/>

		 	<h2>Numbers</h2>
		 	<DisplayPeople arr={filterArr} />
	  	</div>
	)
 }

export default App