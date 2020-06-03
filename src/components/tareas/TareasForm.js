import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareasContext from '../../context/tareas/tareasContext';



const TareasForm = () => {

    // STATES //
    // Context Proyecto
    const proyectosContext = useContext(proyectoContext);
    // Context Tareas
    const tareaContext = useContext(tareasContext);
    // State ppal tarea
    const [tarea, setTarea] = useState({
        nombre: ''
    })

    // DESTRUCTURING //
    // Obtenemos el proyecto seleccionado
    const { proyecto } = proyectosContext;
    //Obtenemos la funcion para agregar la tarea al state general de tareas
    const { errorTarea, tareaSeleccionada, agregarTarea, validarTarea, obtenerTareas, updateTarea } = tareaContext;
    //Obtenemos el nombre del state ppal
    const { nombre } = tarea;

     // EFFECT //
    // Detecta si seleccionaron una tarea para la edicion y la coloca en el form
    useEffect(() => {
        //Verificamos si seleccionaron
        if (tareaSeleccionada !== null) {
            setTarea(tareaSeleccionada);
        } else {
            setTarea({
                nombre: ''
            })
        }
    }, [tareaSeleccionada])
    
    //Validando si proyecto es null (iniciando)
    if(!proyecto) return null;

    //Como es un ARRAY y no un objet es diferente 
    const [proyectoActual] = proyecto;


    // Funciones //
    //Agregando tarea al state ppal
    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    //Submit
    const onSubmit = e => {
        e.preventDefault();

        // Validar 
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }
 
        // Verificamos si es edicion o insercion
        if (tareaSeleccionada === null) {
            // Agregar tarea al state de tarea
            tarea.proyectoId = proyectoActual.id;
            tarea.estado = false;
            agregarTarea(tarea);
        } else {
            //Editamos la tarea
            updateTarea(tarea)
        }

        //Obtener tareas del proyecto 
        obtenerTareas(proyectoActual.id);
        //Reiniciar el form
        setTarea({
            nombre: ''
        })

    }

    return (
        <div className="formulario">
            <form
                onSubmit={ onSubmit }
                >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        name="nombre"
                        placeholder="Nombre Tarea..."
                        className="input-text"
                        value={nombre}
                        onChange={ handleChange }
                        />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit" 
                        value={ tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                        className="btn btn-primario btn-block btn-submit"
                        />
                </div>
            </form>
        { errorTarea ? <p className="mensaje error">El nombre de la tarea es requerido</p>  : null }
        </div>
    );
};

export default TareasForm;