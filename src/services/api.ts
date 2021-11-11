import axios from 'axios'


export const api = axios.create({
    // Abstraindo o endereço, o axios reutiliza o endereço da aplicação
    baseURL: '/api'
})
