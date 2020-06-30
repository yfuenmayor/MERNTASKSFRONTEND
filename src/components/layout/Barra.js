import React, { useContext, useEffect } from 'react';
// Importando Context
import AuthConext from '../../context/auth/authContext';

const Barra = () => {

    // Destructurin de Context //
    const authConext = useContext(AuthConext);
    const { usuario, obtenerUsuario, cerrarSesion } = authConext;

    // UseEffect para cargar los datos del usuario 
    useEffect(() => {
        obtenerUsuario();
        // eslint-disable-next-line
    }, []);

    return (
        <header className="app-header">
            { usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre} </span></p> : null }            
            <nav className="nav-principal">
                <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={ () => cerrarSesion() }
                >Cerrar Sesion</button>
            </nav>
        </header>
    );
};

export default Barra;