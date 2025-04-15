import axios from 'axios';

export const api = axios.create({
    baseURL:'https://ms-delivery-api.onrender.com/api'
})