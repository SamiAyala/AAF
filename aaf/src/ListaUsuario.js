import { Fragment, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './Registrar.css';
import { Link, json } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import CardListaUsuarios from './CardListaUsuarios.js';
import axios from 'axios';
import './ListaUsuario.css'
//import { useState } from 'react';

function ListaUsuario() {
  const [Usuarios, setUsuarios] = useState([{}]);
  useEffect(() => {
    axios.get('http://localhost:5000/aaf/getUsers')
      .then(res => {
        console.log(res)
        setUsuarios(res.data)
      })
      .catch(e => {
      });
  }, []);
  const eliminarUsuario = (Id) => {
    axios.delete('http://localhost:5000/aaf/eliminarUsuario/' + Id)
      .then(res => {
        console.log(res)
      })
    window.location.reload();
  }
  const convertirUsuario = (id,value) => {
    const values = {
      "id":id,
      "rol":value
    }
    axios.put("http://localhost:5000/aaf/convertirUsuario",values)
    .then(res => {
      console.log(res)
      window.location.reload();
    })
  }

  return (
    <div>
      {Usuarios.map(Usuario => <div><CardListaUsuarios Nombre={Usuario.Nombre} Apellido={Usuario.Apellido} Fiscalia={Usuario.Fiscalia} Oficio={Usuario.Oficio} Mail={Usuario.Mail} Telefono={Usuario.Telefono} Rol={Usuario.Rol}></CardListaUsuarios>
        <Button onClick={() => eliminarUsuario(Usuario.Id)} class='button elimnar u-full-width'>Eliminar</Button>
        <DropdownButton id="dropdown-basic-button" title="Cambiar Rol">
          <Dropdown.Item onClick={() => convertirUsuario(Usuario.Id,1)}>Alumno</Dropdown.Item>
          <Dropdown.Item onClick={() => convertirUsuario(Usuario.Id,2)}>Profesor</Dropdown.Item>
        </DropdownButton>
      </div>)}
    </div>
  );
}




export default ListaUsuario