import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';


const RutasPrivadas = ({ component: Component, ...props }) => {

    // CONTEXT //
    const authContext = useContext(AuthContext);
    const { autenticado, cargando, obtenerUsuario } = authContext;

    // Para no perder los datos del usuario a actualizar la pagina //
    useEffect(() => {
        obtenerUsuario();
        // eslint-disable-next-line
    }, [])


    return (
        <Route { ...props } render = { props => !autenticado && !cargando ? (
            <Redirect to="/" />
        ) : (
            <Component { ...props } />
        ) }
        
        />
    );
}

export default RutasPrivadas;

