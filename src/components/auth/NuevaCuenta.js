import React, {useState} from 'react';
//Obtenemos link de direccionamiento
import { Link } from 'react-router-dom';


const NuevaCuenta = () => {

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

        // 2.-Password Minimo 6 caracteres

        // 3.-Validando igualdad de password

        // 4.-Pasarlo al Action 
        
    }

    return (
        <div className="form-usuario">
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