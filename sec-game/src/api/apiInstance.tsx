const axios = require('axios');

const apiUrl = process.env.API || 'http://localhost:3001';



export const apiInstance = axios.create({
    baseURL: apiUrl
})