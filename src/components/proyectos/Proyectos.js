import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import TareasForm from '../tareas/TareasForm';
import ListadoTareas from '../tareas/ListadoTareas';
// Importando Context
import AuthConext from '../../context/auth/authContext';



const Proyectos = () => {

    // Destructurin de Context //
    const authConext = useContext(AuthConext);
    const { obtenerUsuario } = authConext;

    // UseEffect para cargar los datos del usuario 
    useEffect(() => {
        obtenerUsuario();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="contenedor-app">
            {/* Lado izquierdo */}
            <Sidebar  />
            {/* Lado derecho */}
            <div className="seccion-principal">
                <Barra />
                <main>
                    <TareasForm />
                    <div className="contenedor-tareas">
                        <ListadoTareas />
                    </div>
                </main>
            </div>
        </div>
    );
};


export default Proyectos;