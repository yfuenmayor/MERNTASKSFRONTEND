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
                  <Route exact path="/proyectos" component={Proyectos} />
                </Switch>
            </Router>
          </AuthState>
        </AlertasState>
      </TareasState>
    </ProyectoState>
  );
}

export default App;
