import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    // baseURL: 'https://api.example.com/',
    // baseURL: 'http://127.0.0.1:3000/api/v1',
    baseURL: '/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
        // 在发送请求之前做些什么，例如添加 token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // 处理请求错误
        return Promise.reject(error);
    },
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // 对响应数据做点什么
        return response
    },
    (error) => {
        // 处理响应错误
        if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            console.error('Server Error:', error.response.status);
        } else if (error.request) {
            // 请求已发出，但没有收到响应
            console.error('No Response:', error.request);
        } else {
            // 设置请求时发生了一些其他错误
            console.error('Error', error.message);
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;