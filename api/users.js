import createApi from "./createApi";
import axios from 'axios';

const UsersApi = {
    ...createApi('/api/users'),
    getCurrent: () => axios.get('/api/user'),
    updateCurrent: () => axios.get('/api/user')
}

export default UsersApi;
