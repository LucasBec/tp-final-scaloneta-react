import './App.css';

import { Header } from './componentes/Header/Header';
import { Footer } from './componentes/Footer/Footer';
// mis componentes
import { Contactos } from './componentes/Contactos/Contactos';
import { Institucional } from './componentes/Institucional/Institucional';
import { Inicio } from './componentes/Inicio/Inicio';
import { Crud } from './componentes/Jugadores/Jugadores';
import { Convocatoria } from './componentes/Convocatoria/Convocatoria';
import { Convocar } from './componentes/Convocatoria/Convocar';
import { Convocados } from './componentes/Convocatoria/Convocados';
import { Login } from './componentes/Login/Login';
import { Dashboard } from './componentes/Dashboard/Dashboard';
import { Resultado } from './componentes/Convocatoria/Resultado'


import { UserProvider } from './componentes/UserContext/UserContext';
import {BrowserRouter,  Route, Routes} from 'react-router-dom';
import { ProtectedRoute } from './componentes/ProtectedRoute/ProtectedRoute';


function App() {
  return (
    <>
    <div className='App'>
    <BrowserRouter>
      <UserProvider> 
        <Header/>      
        <Routes>
          <Route path='/' element={<Inicio/>}/>
          <Route path='/institucional' element={<Institucional/>}/>
          <Route path='/contactos' element={<Contactos/>}/>
          <Route path='/login' element={<Login/>}/>
          
          <Route path='/privado/dashboard' 
            element={
              // ruta protegida para usuarios logueados, presidente o entrendor
              <ProtectedRoute mustBeEntrenador={false}>
                {<Dashboard/>}
              </ProtectedRoute>
          }/>
  
          <Route path='/privado/crud' 
            element={
              // ruta protegida para usuarios logueados de tipo entrenador
              <ProtectedRoute mustBeEntrenador={true}>
                {<Crud/>}
              </ProtectedRoute>
          }/>
          
          <Route path='/privado/convocatoria' 
            element={
              <ProtectedRoute mustBeEntrenador={true}>
                <Convocatoria/>
              </ProtectedRoute>
          }/>

          <Route path='/privado/convocar/:parametro' 
            element={
              <ProtectedRoute mustBeEntrenador={true}>
                <Convocar/>
              </ProtectedRoute>
          }/>

          <Route path='/privado/resultado/:idConvocatoria/:rival' 
            element={
              <ProtectedRoute mustBeEntrenador={true}>
                <Resultado />
              </ProtectedRoute>
          }/>

          <Route path='/privado/convocados/:idConvocatoria/:rival' 
            element={
              <ProtectedRoute mustBeEntrenador={true}>
                <Convocados/>
              </ProtectedRoute>
          }/>
        </Routes>
        <Footer/>
      </UserProvider>
    </BrowserRouter>
    </div>
    </>
  );
}

export default App;
