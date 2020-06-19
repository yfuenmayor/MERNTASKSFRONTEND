import React, { useReducer } from 'react';
import alertaContext from './alertaContext';
import alertaReducer from './alertaReducer';

import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types';

const AlertaState = props => {
    
    // State Inicial
    const initialState = {
        alerta: null
    }

    // Destructuring //
    const [state, dispatch] = useReducer(alertaReducer, initialState);

    // Funciones //
    const validateAlert = (msg, categoria) => {
        // Mostrar
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        });
        //Ocultar despues de 5s
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            });
        }, 4000);
    }
    return (
        <alertaContext.Provider
            value={{
                alerta: state.alerta,
                validateAlert
            }}
        >
            {props.children}
        </alertaContext.Provider>
    )
}

export default AlertaState;


