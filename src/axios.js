import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    timeout: 5000, // Timeout after 5 seconds
});

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.request.use(
    (config) => {
        console.log('intercepting request' + config.url)

        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        if (!config.url)
            return config

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
        console.log('error: ' + error);
        const originalRequest = error.config;

        //const store = useStore();
        originalRequest._retry = false;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            console.log('Refreshing token...')
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
                //const router = useRouter();
                console.log('Unable to refresh token');
                localStorage.setItem('isLoggedIn', 'false');
                //store.dispatch('setLoggedIn', false);
                //router.push('/login');
            }
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;
