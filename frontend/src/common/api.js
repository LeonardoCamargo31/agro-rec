import axios from "axios";


const token = localStorage.getItem('auth-token')


//axios.create([config])
const api = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 1000,
    headers: { 'Authorization': `Bearer ${token}` }
});

export default api;