import React from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import TareasForm from '../tareas/TareasForm';
import ListadoTareas from '../tareas/ListadoTareas';


const Proyectos = () => {
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