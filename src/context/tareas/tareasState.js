
import React, { useReducer} from 'react';
import { v4 } from 'uuid';
import TareasContext from './tareasContext';
import TareasReducer from './tareasReducer';
// Importamos los Types
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    EDITAR_TAREA
} from '../../types'

 const TareasState = props => {
     // Creamos el state inicial //
     const initialState = {
         tareas:[     
                {id: 1 ,nombre: 'Elegir plataforma', estado: true, proyectoId: 1},
                {id: 2,nombre: 'Elegir Colores', estado: false, proyectoId: 1},
                {id: 3,nombre: 'Configuracion de Plataformas de Pago', estado: true, proyectoId: 1},
                {id: 4,nombre: 'Elegir Hosting', estado: false, proyectoId: 1},
                {id: 5,nombre: 'Plataforma', estado: true, proyectoId: 2},
                {id: 6,nombre: 'Colores', estado: false, proyectoId: 2},
                {id: 7,nombre: 'Configuracion de Plataformas', estado: true, proyectoId: 2},
                {id: 8,nombre: 'Elegir plataforma', estado: true, proyectoId: 3},
                {id: 9,nombre: 'Elegir Temas', estado: false, proyectoId: 3},
                {id: 10,nombre: 'Configuracion de Plataformas de Estilos', estado: true, proyectoId: 3},
                
         ],
        tareasProyecto: null,
        errorTarea: false,
        tareaSeleccionada: null
     }

     // Creando Dispatch y state //
     const [state, dispatch] = useReducer(TareasReducer, initialState);

     // Funciones del context //
     //Obtener tareas por id de proyecto
     const obtenerTareas = proyectoId => {
         dispatch({
             type: TAREAS_PROYECTO,
             payload: proyectoId
         })
     }
     //Agregar tareas a proyecto
     const agregarTarea = tarea => {
        tarea.id = v4();
         dispatch({
             type: AGREGAR_TAREA,
             payload: tarea
         })
     }
     //Mostrar error de validacion de tareas
     const validarTarea = () => {
         dispatch({
             type: VALIDAR_TAREA
         })
     }
      //Obtener tareas por id de proyecto
    const eliminarTarea = tareaId => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: tareaId
        })  
    }

    //Cambiar el estado de una tarea
    const cambiarEdoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }
    //Seleccionando una tarea para la edicion
    const getTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }
    //Actualizando una tarea 
    const updateTarea = tarea => {
        dispatch({
            type: EDITAR_TAREA,
            payload: tarea
        })
    }

     //Retornando los valores
     return (
         <TareasContext.Provider
                value={{
                    tareas: state.tareas,
                    tareasproyecto: state.tareasProyecto,
                    errorTarea: state.errorTarea,
                    tareaSeleccionada: state.tareaSeleccionada,
                    obtenerTareas,
                    agregarTarea,
                    validarTarea,
                    eliminarTarea,
                    cambiarEdoTarea,
                    getTareaActual,
                    updateTarea
                }}
         >
             {props.children}
         </TareasContext.Provider>
     )
 }

 export default TareasState;
