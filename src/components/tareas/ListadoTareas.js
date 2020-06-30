import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea';
//Importamos paquete para transiciones
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// Extraemos los Context necesarios
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareasContext from '../../context/tareas/tareasContext';



const ListadoTareas = () => {

    // STATES //
    const proyectosContext = useContext(proyectoContext);
    const tareaContext = useContext(tareasContext);


    // DESTRUCTURING //
    // Obtenemos el proyecto seleccionado
    const { proyecto, eliminarProyecto } = proyectosContext;
    const { tareasproyecto } = tareaContext;
    
    //Validando si proyecto es null (iniciando)
    if(!proyecto) return <h2>Selecciona un Proyecto</h2>;

    //Como es un ARRAY y no un objet es diferente 
    const [proyectoActual] = proyecto;

    //Funciones
    
    //Eliminar proyecto
    const eliminaProyecto = () => {
        eliminarProyecto(proyectoActual._id)
    }

    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                { tareasproyecto.length === 0 ?
                    (<li className="tarea"><p>No hay tareas asignadas para este proyecto.</p></li>) :
                    <TransitionGroup>
                        {tareasproyecto.map( tarea => (
                            <CSSTransition
                                key={tarea._id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Tarea 
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={eliminaProyecto}
            >Eliminar Proyecto &times;</button>
        </Fragment>
    );
};

export default ListadoTareas;