import './App.css';
import FormIniciarSesion from './Componentes/Formularios/IniciarSesion';
import FormRegistro from './Componentes/Formularios/Registrar';
import Perfil from './Perfil';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EditarPerfil from  './Componentes/Formularios/EditarPerfil' 
import ListaUsuario from './ListaUsuario';
import ListaCursos from './ListaCursos';
import CrearCursos from './Componentes/Formularios/CrearCursos'
import Home from './Componentes/Home';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FormRegistro></FormRegistro>}></Route>
        <Route path='/iniciarSesion' element={<FormIniciarSesion></FormIniciarSesion>}></Route>
        <Route path='/Perfil/:id' element={<Perfil></Perfil>}></Route>
        <Route path='/EditarPerfil/:id' element={<EditarPerfil></EditarPerfil>}></Route>
        <Route path='/ListaUsuarios' element={<ListaUsuario></ListaUsuario>}></Route>
        <Route path='/ListaCursos' element={<ListaCursos></ListaCursos>}></Route>
        <Route path='/CrearCursos' element={<CrearCursos></CrearCursos>}></Route>
        <Route path='/Home' element={<Home></Home>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
