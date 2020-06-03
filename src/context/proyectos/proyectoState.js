import React, { useReducer } from 'react'
import { v4 } from 'uuid';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { 
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
 } from '../../types';

const ProyectoState = props => {

    const proyectos = [
        { id: 1, nombre: 'Tienda virtual'},
        { id: 2, nombre: 'Panaderia'},
        { id: 3, nombre: 'Barber Shop'}
]

    //State  
    const initialState = {
        //Listado de proyectos
        proyectos : [],
        //Variable para mostrar el form de new proyect
        formularioNew: false,
        errorValidacion: false,
        proyecto: null
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
    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    }

    //Funcio para agregar proyectos
    const agregarProyecto = proyecto => {
        proyecto.id = v4();
        //Agregamos proyecto
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        })
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
    const eliminarProyecto = proyectoId => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    }

    //Retornando los datos
    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formularioNew,
                error: state.errorValidacion,
                proyecto: state.proyecto,
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