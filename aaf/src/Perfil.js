import './Perfil.css';
import './Imagenes/Julian.jpg';
import Button from 'react-bootstrap/Button';
//import {useLocation} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Perfil() {
  //const location = useLocation();
  //const [perfil, setPerfil] = useState({});
  let { id } = useParams();
  const {state} = useLocation();
  const Navigate = useNavigate();
  const perfil = state;
  console.log("PERFIL:",perfil)

   let rol = null;

    if (perfil.FkRol===1){
       rol = "Alumno"
    } else if (perfil.FkRol===2) {
      rol = "Profesor"
    } else {
      rol = "Administrador"
    }

    let navigateEditarPefil = () =>{
      Navigate(`/EditarPerfil/${perfil.Id}`, { state: perfil });
  }

  return (
    <div className='container'>
      <button onClick={navigateEditarPefil} className='btn btn-light form boton'>Editar Perfil</button>
      <h3>{perfil.Nombre} {perfil.Apellido}</h3>
      <img src={require('./Imagenes/Julian.jpg')} className='foto' alt=''></img>
      <div className='sobreMi'>
        <h2>Sobre mi: </h2>
        <h3>Rol: {rol}</h3>
        <hr ></hr>
        <h3>Oficio: {perfil.Oficio}</h3>
        <hr ></hr>
        <h3>Fiscalia: {perfil.Fiscalia}</h3>
        <hr ></hr>
        <h3>Descripción: {perfil.Descripcion}</h3>
      </div>
      <div className='contacto'>
        <h2>Contacto: </h2>
        <hr className='hr1'></hr>
        <h3>Correo electronico: {perfil.Mail}</h3>
        <hr className='hr1'></hr>
        <h3>Teléfono: {perfil.Telefono}</h3>
      </div>
    </div>
  );
}

export default Perfil;