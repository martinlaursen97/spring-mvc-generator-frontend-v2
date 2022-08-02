import axios from 'axios';
const baseUrl = "http://localhost:8080/api/";

function getAll(resource) {
    return axios.get(`${baseUrl}${resource}`);
}

function downloadProjectById(resource, id) {
    axios({
        url: `${baseUrl}${resource}/${id}`, //your url
        method: 'POSt',
        responseType: 'blob', // important
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'test.rar'); //or any other extension
        document.body.appendChild(link);
        link.click();
    });
}

function create(newObject, resource) {

    return axios.post(`${baseUrl}${resource}`, newObject);
}

function update(newObject, resource, id) {
    return axios.put(`${baseUrl}${resource}/${id}`, newObject);
}

function remove(resource, id) {
    return axios.delete(`${baseUrl}${resource}/${id}`);
}

export default {
    getAll,
    create,
    update,
    remove,
    downloadProjectById
}