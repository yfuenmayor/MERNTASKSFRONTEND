import React, { Fragment, useState, useContext} from 'react';
//Importamos el Context para poder usarlo
import proyectoContext from '../../context/proyectos/proyectoContext';
// import Proyecto from './Proyecto';


const NuevoProyecto = () => {

//<- STATES ->//
    //State del nuevo proyecto
    const [proyecto, setProyecto] = useState({
        nombre: ''
    })
    //State del Context
    const proyectosContext = useContext(proyectoContext);

//<- Destructuring ->//

    const { nombre } = proyecto;
    const { formulario, mostrarFormulario, agregarProyecto, error, errorForm } = proyectosContext;

//<- FUNCIONES ->//
    //Lee los contenidos del input
    const onChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    //Submit del Nuevo proyecto
    const onSubmitProyectoNew = e => {
        e.preventDefault();
        // 1.- Validar campo
        if( nombre === '') {
            errorForm();
            return ;
        }
        // 2.-Cargar al state
        agregarProyecto(proyecto)
        // 3.-Reiniciar el form
        setProyecto({
            nombre:''
        })
    }


    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={ () => mostrarFormulario()}
            >
                Nuevo Proyecto
            </button>
        { formulario ? (
            <form 
                className="formulario-nuevo-proyecto"
                onSubmit={onSubmitProyectoNew}
            >
                <input 
                    className="input-text"
                    placeholder="Nuevo Proyecto"
                    type="text" 
                    name="nombre" 
                    id="nombre"
                    value={nombre}
                    onChange={onChangeProyecto}
                />
                <input 
                    type="submit" 
                    className="btn btn-primario btn-block"
                    value="Agregar Proyecto"
                />
            </form>
            ) : null }

            { error ? <p className="mensaje error">El nombre es obligatorio</p> : null}
        </Fragment>
    );
};

export default NuevoProyecto;