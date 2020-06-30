import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

//Importamos el cliente axios para conectarnos a la API
import clienteAxios from '../../config/axios';
//Importamos el la cabezera para las operaciones despues de logueados
import tokenAuth from '../../config/tokenAuth';

import {
    REGISTRO_EXITO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITO,
    LOGIN_ERROR,
    LOGOUT
} from '../../types';

const AuthState = props => {
    // State Inicial //
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // FUNCIONES //

    const registrarUsuario = async datos => {
        try {
            // registramos en la base de datos segun el route definido en el index de la API
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            // console.log(respuesta);

            dispatch({
                type: REGISTRO_EXITO,
                payload: respuesta.data
            });

            // Tomamos los datos del usuario logueado
            obtenerUsuario();

        } catch (error) {

            // console.log(error.response.data.msg);
            // Creamos la alerta 
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            });
        }
    }

    // Obtener los datos del usuario autenticado
    const obtenerUsuario = async () => {
        //Tomamos el token que almacenamos en el LocalStorage
        const token = localStorage.getItem('token');

        if(token){
            // TODO: Funcion para enviar token por HEADERS
            tokenAuth(token);
        }

        // Obtener los datos del usuario logueado
        try {

            const respuesta = await clienteAxios.get('/api/auth');
            // console.log(respuesta.data);
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });

        } catch (error) {

            // console.log(error.response);
            // console.log(error.response.data.msg);
            
            // Creamos la alerta 
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });

        }
    }

    // Login 
    const iniciarSesion = async datos => {
        // console.log(datos);

        try {
            // Enviamos los datos del login al server 
            const respuesta = await clienteAxios.post('/api/auth', datos);
            // console.log(respuesta);
            dispatch({
                type: LOGIN_EXITO,
                payload: respuesta.data
            });

            // Tomamos los datos del usuario logueado
            obtenerUsuario();

        } catch (error) {
             console.log(error.response.data.msg);
            // Creamos la alerta 
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        }
    }
    
    // Logout 
    const cerrarSesion = () => {
        dispatch({
            type: LOGOUT
        });
    }
    
    return ( 
        <AuthContext.Provider
            value= {{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                obtenerUsuario,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthState;