import './App.css';
import FormIniciarSesion from './Componentes/Formularios/IniciarSesion';
import FormRegistro from './Componentes/Formularios/Registrar';
import Perfil from './Componentes/Perfil';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EditarPerfil from './Componentes/Formularios/EditarPerfil'
import ListaUsuario from './Componentes/ListaUsuario';
import ListaCursos from './Componentes/ListaCursos';
import CrearCursos from './Componentes/Formularios/CrearCursos'
import Home from './Componentes/Home';
import AgregarNoticia from './Componentes/Formularios/AgregarNoticia';
import Layout from './Componentes/Layout';
import { usuarioContext , isAdmContext } from './Context/Context';
import { useState } from 'react';

const App = () => {

  const [usuarioLogeado, setUsuarioLogeado] = useState('');
  const [isAdm, setIsAdm] = useState(false);

  return (
    <usuarioContext.Provider value={{ usuarioLogeado, setUsuarioLogeado }}>
      <isAdmContext.Provider value={{ isAdm, setIsAdm }}>
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
              <Route path='/CrearCursos' element={<CrearCursos />}></Route>
              <Route path='/AgregarNoticia' element={<AgregarNoticia />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </isAdmContext.Provider>
    </usuarioContext.Provider>
  );
}

export default App;
