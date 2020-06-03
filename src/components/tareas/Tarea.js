import React, { useContext } from 'react';
import tareasContext from '../../context/tareas/tareasContext';


const Tarea = ({tarea}) => {

    // STATE //
    // Context Tareas
    const tareaContext = useContext(tareasContext);

    // Destructuring //
    const { nombre, estado, proyectoId} = tarea;
    //Obtenemos la funcion para agregar la tarea al state general de tareas
    const { eliminarTarea, obtenerTareas, cambiarEdoTarea, getTareaActual } = tareaContext;
    
    // FUNCIONES //
    // Para eliminar una tarea al presional el boton de eliminar
    const eliminaTarea = id => {
        eliminarTarea(id);
        obtenerTareas(proyectoId);
    }

    //Cambiar estado de las tareas 
    const cambiarEstado = tarea => {
        //Modificamos el estado de la tarea
        if (tarea.estado) {
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }
        //pasamos la tarea modificada
        cambiarEdoTarea(tarea);
    }

    // Agrega una tarea para la edicion de la misma
    const seleccionarTarea = tarea => {
        getTareaActual(tarea);
    }
    

    return (
        <li className="tarea sombra">
            <p>{nombre}</p>
            <div className="estado">
                { estado ? 
                    (<button 
                        type="button" 
                        className="completo"
                        onClick={ () => cambiarEstado(tarea) }
                    >Completo</button>)
                 :
                    (<button 
                        type="button" 
                        className="incompleto"
                        onClick={ () => cambiarEstado(tarea) }
                    >Incompleto</button>)
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={ () => seleccionarTarea(tarea)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={ () => eliminaTarea(tarea.id)}
                >Eliminar</button>
            </div>
        </li>
    );
};

export default Tarea;