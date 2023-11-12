import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import FormIniciarSesion from './Componentes/Formularios/IniciarSesion';
import FormRegistro from './Componentes/Formularios/Registrar';
import Perfil from './Componentes/Perfil';
import EditarPerfil from './Componentes/Formularios/EditarPerfil'
import ListaUsuario from './Componentes/ListaUsuario';
import ListaCursos from './Componentes/ListaCursos';
import MisCursos from './Componentes/MisCursos';
import CrearCursos from './Componentes/Formularios/CrearCursos'
import Home from './Componentes/Home';
import AgregarNoticia from './Componentes/Formularios/AgregarNoticia';
import VerDetalleCursos from './Componentes/VerDetalleCurso';
import AgregarMaterial from './Componentes/Formularios/AgregarMAteriales';
import CrearClase from './Componentes/Formularios/CrearClase';
import ListaClases from './Componentes/ListaClases';
import Asistencia from './Componentes/Asistencia';
import Layout from './Componentes/Layout';
import ListaAsistencia from './Componentes/ListaAsistencia';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { usuarioContext , isAdmContext, isProContext } from './Context/Context';
import { useState } from 'react';


const App = () => {

  const [usuarioLogeado, setUsuarioLogeado] = useState('');
  const [isAdm, setIsAdm] = useState(false);
  const [isPro, setIsPro] = useState(false);


  return (
    <usuarioContext.Provider value={{ usuarioLogeado, setUsuarioLogeado }}>
      <isAdmContext.Provider value={{ isAdm, setIsAdm }}>
      <isProContext.Provider value={{ isPro, setIsPro }}>

        <BrowserRouter>
          <Routes>
            <Route path='/iniciarSesion' element={<FormIniciarSesion />}></Route>
            <Route path='/Registrarse' element={<FormRegistro />}></Route>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} ></Route>
              <Route path='/Perfil/:id' element={<Perfil />}></Route>
              <Route path='/EditarPerfil/:id' element={<EditarPerfil />}></Route>
              <Route path='/ListaUsuarios' element={<ListaUsuario />}></Route>
              <Route path='/ListaCursos' element={<ListaCursos />}></Route>
              <Route path='/MisCursos' element={<MisCursos />}></Route>
              <Route path='/CrearCursos' element={<CrearCursos />}></Route>
              <Route path='/AgregarNoticia' element={<AgregarNoticia />}></Route>
              <Route path='/VerDetalle/:id' element={<VerDetalleCursos/>}></Route>
              <Route path='/AgregarMaterial/:id' element={<AgregarMaterial/>}></Route>
              <Route path='/CrearClase/:id' element={<CrearClase/>}></Route>
              <Route path='/ListaClases/:id' element={<ListaClases/>}></Route>
              <Route path='/Asistencia' element={<Asistencia/>}></Route>
              <Route path='/ListaAsistencia/:id' element={<ListaAsistencia/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
        </isProContext.Provider>
      </isAdmContext.Provider>
    </usuarioContext.Provider>
  );
}

export default App;
