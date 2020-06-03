import React, {useState} from 'react';
//Obtenemos link de direccionamiento
import { Link } from 'react-router-dom';

const Login = () => {

    // STATES
    // State para guardar usuario
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    })

    //Extraemos los datos del usuario
    const { email, password } = usuario;

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

        // 2.-Pasarlo al Action 
        
    }

    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1>
                <form 
                    onSubmit={onSubmit}
                >
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
                        <input 
                            type="submit" 
                            value="Iniciar Sesión" 
                            className="btn btn-block btn-primario"
                        />
                    </div>
                </form>
                <Link
                    to="/nueva-cuenta"
                    className="enlace-cuenta"
                >
                    Obtener Cuenta
                </Link>
            </div>
        </div>
    );
};


export default Login;