import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.github.com/',
});

axiosInstance.interceptors.request.use((config) => {
    const newConfig = config;
    newConfig.auth = {
        username: process.env.REACT_APP_GH_CLIENT_ID,
        password: process.env.REACT_APP_GH_CLIENT_SECRET,
        ...config.params,
    };
    return newConfig;
});

export default axiosInstance;
