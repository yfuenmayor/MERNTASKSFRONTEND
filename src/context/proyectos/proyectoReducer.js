import { 
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS, 
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../../types';


export default (state, action) => {
    
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formularioNew: true
            }
        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload
            }
        case AGREGAR_PROYECTO:
            return {
                //Copiamos el state general
                ...state,
                //Agregamos el proyecto al state general
                proyectos: [ ...state.proyectos, action.payload],
                //Ocultalos el form
                formularioNew: false,
                errorValidacion: false
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorValidacion: true
            }
        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyecto: state.proyectos.filter( proyecto => proyecto._id === action.payload)
            }
        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter( proyecto => proyecto._id !== action.payload),
                proyecto:null
            }
        case PROYECTO_ERROR:
            return {
                ...state,
                mensajeError: action.payload
            }
    
        default:
            return state;
    }
}
