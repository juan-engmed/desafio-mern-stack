import axios from 'axios';

const api_db = axios.create({
    baseURL:'http://localhost:4000'
});

export default api_db;