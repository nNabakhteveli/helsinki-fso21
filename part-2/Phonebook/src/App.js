import React, { useState, useEffect } from 'react'
import DBHandler from './handleDB.js'
import axios from 'axios'

const Notification = ({ message, username }) => {
	const style = {
		"border": "3px solid green",
		"fontSize": "1.150rem",
		"padding": "5px"
	}

	if(message === "success") {
		return (
			<div style={style}>
				<p>Contact has been added successfuly!</p>
			</div>
		);
	} else if(message === "update") {
		return (
			<div style={style}>
				<p>This contact has been updated!</p>
			</div>
		);
	} else if(message === "error") {
		style.border = "3px solid red";
		style.color = "red";
		return (
			<div style={style}>
				<p>Information of {username} has already been removed from server</p>
			</div>
		);
	}
	return null;
}


const DisplayPeople = ({ arr }) => arr.map(person => <div key={person.id}>
		<p>{person.name} - {person.number}</p><button onClick={(e) => DBHandler.deleteContact(person.name, person.id) }>Delete</button>
	</div>)


const PersonForm = props => {	
	return(
		<form onSubmit={props.submit}>
			<div>
				Name: <input value={props.name} onChange={props.nameHandler} required />
			</div>
			<br />
			<div>
				Number: <input value={props.number} onChange={props.numberHandler} required />
			</div>
			<div>
			  <button type="submit">add</button>
			</div>
	 	</form>
	);
}

const Filter = ({ filterHandler }) => <> Filter with name <input onChange={filterHandler} /> </>

const App = () => {
	const [persons, setPersons] = useState([]); 
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filterArr, setFilter] = useState(persons);
	const [status, setStatus] = useState({response: "", username: ""});

	useEffect(() => {
		axios.get('http://localhost:3001/persons').then(response => {
			setPersons(response.data);
			setFilter(response.data);
		})

		DBHandler.getData().then(response => {
			setPersons(response);
			setFilter(response);
		});
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
				let result = window.confirm(`${i.name} is already added to phonebook, replace the old number with a new one?`)
				if(result) {
					DBHandler.updateContactData(i.id, {...i, number: newNumber}).then(() => {
						setStatus({ response: "update", username: "" });
						window.location.reload();	
					}).catch(() => {
						setStatus({ response: "error", username: i.name });
					});
					return;
				} else 
					return;
				
			} 
		}
		DBHandler.addData({ name: newName, number: newNumber });
		setStatus({ response: "success", username: "" });

		let updatedArr = [...persons, { name: newName, number: newNumber, id: persons.length + 1 }];
		setPersons(updatedArr);
		setFilter(updatedArr);
	}

	return (
		<div>
			<Notification message={status.response} username={status.username} />
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