import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';


const ListadoProyectos = () => {
    
    // STATES //
    //State del Context
    const proyectosContext = useContext(proyectoContext);

    // DESTRUCTURING //
    //Estraer proyectos del state inicial
    const { proyectos, obtenerProyectos } = proyectosContext;

    // Funciones //
    useEffect(() => {
        obtenerProyectos();
        // eslint-disable-next-line
    }, [])
    
    if(proyectos.length === 0) return <p>No hay proyectos creados</p>;

    return (
        <ul className="listado-proyectos">
            <TransitionGroup>
                { proyectos.map( proyecto => (
                    <CSSTransition
                        key={proyecto.id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto 
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>    
        </ul>
    );
};

export default ListadoProyectos;