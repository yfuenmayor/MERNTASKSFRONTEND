import React, { useReducer } from 'react'
// import { v4 } from 'uuid';
import ClienteAxios from '../../config/axios';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { 
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
 } from '../../types';

const ProyectoState = props => {

    // const proyectos = [
    //     { id: 1, nombre: 'Tienda virtual'},
    //     { id: 2, nombre: 'Panaderia'},
    //     { id: 3, nombre: 'Barber Shop'}
    // ]

    //State  
    const initialState = {
        //Listado de proyectos
        proyectos : [],
        //Variable para mostrar el form de new proyect
        formularioNew: false,
        errorValidacion: false,
        proyecto: null,
        mensajeError: null
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    //Serie de funciones para el CRUD

    //Funcion para mostrar el formulario de nuevo proyecto
    const mostrarFormulario = () => {
        //Este es el que le pasa la opcion al Reduce
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //Funcion para obtener los proyectos: payload es lo que toma la fun como parametro
    const obtenerProyectos = async () => {
        // dispatch({
        //     type: OBTENER_PROYECTOS,
        //     payload: proyectos
        // })
        
        try {
            const respuesta = await ClienteAxios.get('/api/proyectos');
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: respuesta.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg: `${error.response.data}`,
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
                
            })
        }
    }

    //Funcio para agregar proyectos
    const agregarProyecto = async proyecto => {
        // proyecto.id = v4();
        // dispatch({
        //     type: AGREGAR_PROYECTO,
        //     payload: respuesta.data
        // })

        try {
            const respuesta = await ClienteAxios.post('/api/proyectos', proyecto);
            // console.log(respuesta);
            //Agregamos proyecto al state
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: respuesta.data
            })
        } catch (error) {
            const alerta = {
                msg: `${error.response.data}`,
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
                
            })
            
        }

    }

    //Funcion para mostrar error de validacion de form Pruyecto new
    const errorForm = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    //Selecciona el proyecto que el usuario dio click y lo muestra
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }
    //Eliminando un proyecto
    const eliminarProyecto = async proyectoId => {
        // dispatch({
        //     type: ELIMINAR_PROYECTO,
        //     payload: proyectoId
        // })

        try {
            await ClienteAxios.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            const alerta = {
                msg: `${error.response.data}`,
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
                
            })
        }
    }

    //Retornando los datos
    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formularioNew,
                error: state.errorValidacion,
                proyecto: state.proyecto,
                mensajeError: state.mensajeError,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                errorForm,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}
 
export default ProyectoState;