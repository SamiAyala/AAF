import './App.css';
import FormIniciarSesion from './IniciarSesion';
import FormRegistro from './Registrar.js';
import Perfil from './Perfil.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EditarPerfil from  './EditarPerfil' 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FormRegistro></FormRegistro>}></Route>
        <Route path='/iniciarSesion' element={<FormIniciarSesion></FormIniciarSesion>}></Route>
        <Route path='/Perfil/:id' element={<Perfil></Perfil>}></Route>
        <Route path='/EditarPerfil/:id' element={<EditarPerfil></EditarPerfil>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
