import clienteAxios from './axios';

const tokenAuth = token => {
    if (token) {
        // Creamos la cabezera con el token para la peticion
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
    } else {
        // Eliminamos la cabezera
        delete clienteAxios.defaults.headers.common['x-auth-token'];
    }
}


export default tokenAuth;