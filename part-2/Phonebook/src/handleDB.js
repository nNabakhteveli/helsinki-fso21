import axios from 'axios';

const get = () => {
    return axios.get('http://localhost:3001/persons').then(response => response.data);
}

const add = (object) => {
    axios.post("http://localhost:3001/persons", object);
}

const deleteUser = (name, id) => {
	let result = window.confirm(`Delete ${name}?`)
	
	if(result) {
        axios.delete(`http://localhost:3001/persons/${id}`)
        window.location.reload();
    }
}

const exportsObj = { get, add, deleteUser }; 

export default exportsObj;