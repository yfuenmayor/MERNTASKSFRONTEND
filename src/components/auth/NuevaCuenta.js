import React, { useState, useContext, useEffect } from 'react';
//Obtenemos link de direccionamiento
import { Link } from 'react-router-dom';
// Importamos context necesarios
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/auth/authContext';


const NuevaCuenta = (props) => {
    // DESTRUCTURING DEL CONTEXT //
    // Alertas
    const alertaContext = useContext(AlertaContext);
    const { alerta, validateAlert } = alertaContext;
    // Auth
    const authContext = useContext(AuthContext);
    const { autenticado, mensaje, registrarUsuario } = authContext;

    // UseEffect para accionar tras la auth //
    useEffect(() => {
        // Si registramos correctamente
        if(autenticado){
            props.history.push('/proyectos');
        }

        //Mostramos mensaje de error
        if (mensaje) {
            validateAlert(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line 
    }, [ mensaje, autenticado, props.history]);

    // STATES
    // State para guardar usuario
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })

    //Extraemos los datos del usuario
    const { nombre, email, password, confirmar } = usuario;

    //Funcion para captar los datos ingresados
    const onChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    };

    //Funcion para el Submit del inicio de sesion
    const onSubmit = e => {
        e.preventDefault();

        // 1.-Validar que los campos no esten vacios
        if ( nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            validateAlert('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        // 2.-Password Minimo 6 caracteres
        if (password.length < 6) {
            validateAlert('El Password debe contener al menos 6 caracteres', 'alerta-error');
            return;
        }

        // 3.-Validando igualdad de password
        if (password !== confirmar) {
            validateAlert('Los Passwords no son iguales', 'alerta-error');
            return;
        }

        // 4.-Pasarlo al Action 
        registrarUsuario({
            nombre,
            email,
            password
        })
        
    }

    return (
        <div className="form-usuario">
            { alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null }
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>
                <form 
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Nombre</label>
                        <input 
                            type="text" 
                            name="nombre" 
                            id="nombre"
                            placeholder="Tu Nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password"
                            placeholder="Tu Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Comfirmar Password</label>
                        <input 
                            type="password" 
                            name="confirmar" 
                            id="confirmar"
                            placeholder="Repite tu Password"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            value="Iniciar Sesión" 
                            className="btn btn-block btn-primario"
                        />
                    </div>
                </form>
                <Link
                    to="/"
                    className="enlace-cuenta"
                >
                    Iniciar Sesión
                </Link>
            </div>
        </div>
    );
};


export default NuevaCuenta;