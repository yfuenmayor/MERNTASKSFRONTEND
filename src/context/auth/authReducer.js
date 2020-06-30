import {
    REGISTRO_EXITO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITO,
    LOGIN_ERROR,
    LOGOUT
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case REGISTRO_EXITO:
        case LOGIN_EXITO:
            //almacenamos en el localStorage
            localStorage.setItem('token', action.payload.token);
            // Retornamos los valores
            return {
                ...state,
                autenticado: true,
                cargando: false,
                mensaje: null
            }
        
        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado:true,
                cargando: false,
                usuario: action.payload
            }

        case LOGIN_ERROR:
        case LOGOUT:
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                cargando: false,
                mensaje: action.payload
            }
        
        default:
            return state;
    }
}