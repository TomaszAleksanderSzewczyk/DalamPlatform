import axios from 'axios';

const createApi = (path) => ({
    getOne: (id) => axios.get(`${path}/${id}`),
    getAll: () => axios.get(`${path}`),
    create: (data) => axios.post(`${path}`, data),
    update: (id, data) => axios.patch(`${path}/${id}`, data),
    deleteOne: (id) => axios.delete(`${path}/${id}`),
})

export default createApi;