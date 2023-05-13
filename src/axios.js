import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    timeout: 5000, // Timeout after 5 seconds
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;