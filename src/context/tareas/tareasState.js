
import React, { useReducer} from 'react';
// import { v4 } from 'uuid';
import clienteAxios from '../../config/axios';
import TareasContext from './tareasContext';
import TareasReducer from './tareasReducer';
// Importamos los Types
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    EDITAR_TAREA
} from '../../types'

 const TareasState = props => {
     // Creamos el state inicial //
     const initialState = {
        tareasProyecto: [],
        errorTarea: false,
        tareaSeleccionada: null
     }

     // Creando Dispatch y state //
     const [state, dispatch] = useReducer(TareasReducer, initialState);

     // Funciones del context //
     //Obtener tareas por id de proyecto
     const obtenerTareas = async proyecto_id => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', { params : { proyecto_id }}); 
                       
            dispatch({
                 type: TAREAS_PROYECTO,
                 payload: resultado.data.tareas
             })
        } catch (error) {
            console.log(error);
            
        }
     }
     //Agregar tareas a proyecto
     const agregarTarea = async tarea => {
        
        // console.log('Agregar TareaState: ',tarea);
        
        try {
            const respuesta = await clienteAxios.post('/api/tareas', tarea);
            // console.log(respuesta);

             dispatch({
                type: AGREGAR_TAREA,
                payload: respuesta.data.tarea
            });
            
        } catch (error) {
            console.log(error)
        }
     }
     //Mostrar error de validacion de tareas
     const validarTarea = () => {
         dispatch({
             type: VALIDAR_TAREA
         })
     }
      //Obtener tareas por id de proyecto
    const eliminarTarea = async (tarea_id, proyecto_id) => { 
        try {
            await clienteAxios.delete(`/api/tareas/${tarea_id}`, {params: { proyecto_id }});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: tarea_id
            }) 
        } catch (error) {
            console.log(error);
            
        }
    }

    //Seleccionando una tarea para la edicion
    const getTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }
    //Actualizando una tarea 
    const updateTarea = async tarea => {
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            // console.log(resultado);
            
            dispatch({
                type: EDITAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error);
            
        }
    }

     //Retornando los valores
     return (
         <TareasContext.Provider
                value={{
                    // tareas: state.tareas,
                    tareasproyecto: state.tareasProyecto,
                    errorTarea: state.errorTarea,
                    tareaSeleccionada: state.tareaSeleccionada,
                    obtenerTareas,
                    agregarTarea,
                    validarTarea,
                    eliminarTarea,
                    getTareaActual,
                    updateTarea
                }}
         >
             {props.children}
         </TareasContext.Provider>
     )
 }

 export default TareasState;
