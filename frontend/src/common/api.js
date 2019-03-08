import axios from "axios";


const token = localStorage.getItem('auth-token')

const api = axios.create({
    baseURL: "http://localhost:5000",
    headers: {'Authorization': token}
});

console.log(api.defaults.headers)

export default api;