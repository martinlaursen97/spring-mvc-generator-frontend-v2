import axios from 'axios';
const baseUrl = "http://localhost:8080/api/";

function getAll(resource) {
    return axios.get(`${baseUrl}${resource}`);
}

function create(newObject, resource) {

    return axios.post(`${baseUrl}${resource}`, newObject);
}

function update(newObject, resource, id) {
    const request = axios.put(`${baseUrl}/${resource}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    update
}