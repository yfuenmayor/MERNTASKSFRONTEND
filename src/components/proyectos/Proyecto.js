import React, { useContext } from 'react';
// Importando Context necesarios
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareasContext from '../../context/tareas/tareasContext';



const Proyecto = ({proyecto}) => {

    // STATES //
    //Obteniendo del Context
    const proyectosContext = useContext(proyectoContext);
    const tareaContext = useContext(tareasContext);

    // DESTRUCTURING //
    const { proyectoActual } = proyectosContext;
    const { obtenerTareas } = tareaContext;


    // Funciones //
    const obtenerProyectoActual = id => {
         
        // Fijamos el proyecto en la vista
        proyectoActual(id);

        //Seleccionamos las tareas del proyecto actual
        obtenerTareas(id);

    }
    return (
         <li>
             <button
                type="button"
                className="btn btn-blank"
                onClick={ () => obtenerProyectoActual(proyecto._id)}
             >{proyecto.nombre}</button>
         </li>
    );
};

export default Proyecto;