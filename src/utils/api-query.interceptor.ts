import axios from 'axios';
import { apiUrl } from "../config/api";
import { api } from "../libs/Api";

export const myApi = axios.create({
    baseURL: apiUrl
});

myApi.interceptors.request.use(function (config) {
    config.withCredentials = true;
    config.headers["Access-Control-Allow-Credentials"] = true;
    return config;
}, function (error) {
    return Promise.reject(error);
});


myApi.interceptors.response.use(undefined, async (err) => {
    const status = err.response ? err.response.status : null;
    if ( [401, 403].includes(status) ) {
        window.location.href = '/';
        await api.logout();
    } else if ( status === 400 ) {
        throw new Error(err.response.data.message)
    } else {
        throw new Error('Nie udało się przetworzyć żądania, Spróbuj ponownie')
    }
});