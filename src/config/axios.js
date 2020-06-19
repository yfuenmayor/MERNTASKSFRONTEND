import axios from 'axios';

const clienteAxios = axios.create({
    baseUrl: process.env.REACT_APP_URLBACKEND
});

export default clienteAxios;