import React from 'react';
//Habilitando el Router entre las paginas principales
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//Importando componentes de paginas principales
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';
//Importando Context
import ProyectoState from './context/proyectos/proyectoState';
import TareasState from './context/tareas/tareasState';
import AlertasState from './context/alertas/alertaState';
import AuthState from './context/auth/authState';
// Importando funcion para obtener el token y colocarlo en la cabezera
import tokenAuth from './config/tokenAuth';
// Importamos el Higher Order Components
import RutasPrivadas from './components/Rutas/RutasPrivadas';


//Creamos el token en la cabezera (esto para cuando refresquen la pagino no se pierdan los datos del usuario)
const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
}


//Funcion Ppal
function App() {
  
  return (
    <ProyectoState>
      <TareasState>
        <AlertasState>
          <AuthState>
            <Router> 
              {/* // Lo que se vera en todas las paginas */}
                <Switch>
                  {/* Rutas Principales */}
                  <Route exact path="/" component={Login} />
                  <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                  <RutasPrivadas exact path="/proyectos" component={Proyectos} />
                </Switch>
            </Router>
          </AuthState>
        </AlertasState>
      </TareasState>
    </ProyectoState>
  );
}

export default App;
