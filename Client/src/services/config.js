import axios from 'axios'

const API = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true
})

API.interceptors.request.use(
    config => {
        const token = localStorage.getItem('silvermicro_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        } else {
            delete config.headers.Authorization
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default API