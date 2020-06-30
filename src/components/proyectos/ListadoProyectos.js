import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Proyecto from './Proyecto';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';


const ListadoProyectos = () => {
    
    // STATES //
    //State del Context
    const proyectosContext = useContext(ProyectoContext);
    const alertaContext = useContext(AlertaContext);

    // DESTRUCTURING //
    //Estraer proyectos del state inicial
    const { proyectos, mensajeError, obtenerProyectos } = proyectosContext;
    //Estraer alertas del state inicial
    const { alerta, validateAlert } = alertaContext;
    
    // Funciones //
    useEffect(() => {
        // Mostramos mensaje de error
        if(mensajeError){
            validateAlert(mensajeError.msg, mensajeError.categoria);
        }
        // Obtenemos proyectos
        obtenerProyectos();

        // eslint-disable-next-line
    }, [mensajeError])
    
    if(proyectos.length === 0) return <p>No hay proyectos creados</p>;

    return (
        <ul className="listado-proyectos">
            { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }
            <TransitionGroup>
                { proyectos.map( proyecto => (
                    <CSSTransition
                        key={proyecto._id}
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