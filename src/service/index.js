import axios from 'axios';

export * from '@/service/popular';

const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_API
});

AxiosInstance.interceptors.request.use((config) => {
    if (config) return config;
});

AxiosInstance.interceptors.response.use(
    (response) => {
        if (response) return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default { AxiosInstance };
