import './Card.css';
import React from 'react';

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function CardListaUsuarios({ Usuario, eliminarUsuario, convertirUsuario }) {
   return (
      <>
         {
            <div class="cita">
               <p>Nombre : <span>{Usuario.Nombre}</span></p>
               <p>Apellido: <span>{Usuario.Apellido}</span></p>
               <p>Fiscalia: <span>{Usuario.Fiscalia}</span></p>
               <p>Oficio: <span>{Usuario.Oficio}</span></p>
               <p>Mail: <span>{Usuario.Mail}</span></p>
               <p>Telefono: <span>{Usuario.Telefono}</span></p>
               <p>Rol: <span>{Usuario.Rol}</span></p>
               <Button onClick={() => eliminarUsuario(Usuario.Id)} class='button elimnar u-full-width'>Eliminar</Button>
               <DropdownButton id="dropdown-basic-button" title="Cambiar Rol">
                  <Dropdown.Item onClick={() => convertirUsuario(Usuario.Id, 1)}>Alumno</Dropdown.Item>
                  <Dropdown.Item onClick={() => convertirUsuario(Usuario.Id, 2)}>Profesor</Dropdown.Item>
               </DropdownButton>
            </div>
            //<p>{text1} <span type="span">{text2}</span></p>
         }
      </>
   )
}
export default CardListaUsuarios;