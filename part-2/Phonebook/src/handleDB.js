import axios from 'axios';

const getData = () => {
    return axios.get('http://localhost:3001/persons').then(response => response.data);
}

const addData = (object) => {
    axios.post("http://localhost:3001/persons", object);
}

const deleteContact = (name, id) => {
	let result = window.confirm(`Delete ${name}?`)
	
	if(result) {
        axios.delete(`http://localhost:3001/persons/${id}`);
        window.location.reload();
    }
}

const updateContactData = (id, newData) => axios.put(`http://localhost:3001/persons/${id}`, newData);

const exportsObj = { getData, addData, deleteContact, updateContactData }; 

export default exportsObj;