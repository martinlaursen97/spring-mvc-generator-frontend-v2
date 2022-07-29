import axios from 'axios';
const baseUrl = "http://localhost:8080/api/";

function getAll(resource) {
    return axios.get(`${baseUrl}${resource}`);
}

function create(newObject, resource) {

    return axios.post(`${baseUrl}${resource}`, newObject);
}

function update(newObject, resource, id) {
    return axios.put(`${baseUrl}${resource}/${id}`, newObject);
}

export default {
    getAll,
    create,
    update
}