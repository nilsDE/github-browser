import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.github.com/',
});

axiosInstance.interceptors.request.use((config) => {
    config.params = {
        client_id: process.env.REACT_APP_GH_CLIENT_ID,
        client_secret: process.env.REACT_APP_GH_CLIENT_SECRET,
        ...config.params,
    };
    return config;
});

export default axiosInstance;
