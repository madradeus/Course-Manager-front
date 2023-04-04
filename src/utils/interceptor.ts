import axios from 'axios';
import { apiUrl } from "../config/api";
import { api } from "../libs/Api";

export const myApi = axios.create({
    baseURL: apiUrl
});

myApi.interceptors.response.use(undefined, async (err) => {
    const status = err.response ? err.response.status : null;
    if ( status === 403 ) {
        window.location.href = '/';
        await api.logout();
    } else {
        throw new Error('Nie udało się przetworzyć żądania, Spróbuj ponownie')
    }
});