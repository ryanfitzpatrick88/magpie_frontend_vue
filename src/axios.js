import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    timeout: 5000, // Timeout after 5 seconds
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');

        if (config.url.endsWith('auth/refresh')) {
            if (refreshToken) {
                config.headers['Authorization'] = 'Bearer ' + refreshToken;
            }
        } else {
            if (accessToken) {
                config.headers['Authorization'] = 'Bearer ' + accessToken;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token');
            try {
                const response = await axiosInstance.post('auth/refresh', {}, {
                    headers: {
                        'Authorization': 'Bearer ' + refreshToken
                    }
                });

                console.log('Refresh token response:', response.data)

                localStorage.setItem('access_token', response.data.access_token);

                originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access_token;

                return axiosInstance(originalRequest);
            } catch (e) {
                console.log('Unable to refresh token');
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
