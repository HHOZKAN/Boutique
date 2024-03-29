import axios from 'axios';
import store from '../store';

const api = axios.create();

api.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.user.token; 

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;