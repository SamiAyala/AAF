import { Fragment, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Registrar.css';
import {Link, json} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import CardListaUsuarios from './CardListaUsuarios.js';
import axios from 'axios';
import './ListaUsuario.css'
//import { useState } from 'react';

function ListaUsuario(){
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
    const eliminarUsuario = (Id) =>{
        axios.delete('http://localhost:5000/aaf/eliminarUsuario/' + Id)
        .then(res => {
          console.log(res)
        })
        window.location.reload();
  }
    return (
      <div>
        {Usuarios.map(Usuario =><div><CardListaUsuarios Nombre={Usuario.Nombre} Apellido={Usuario.Apellido} Fiscalia={Usuario.Fiscalia} Oficio={Usuario.Oficio} Mail={Usuario.Mail} Telefono={Usuario.Telefono} Rol={Usuario.Rol}></CardListaUsuarios>            
        <button onClick={() => eliminarUsuario(Usuario.Id)} class='button elimnar u-full-width'>Eliminar</button>
        </div>)}
      </div>
    ); 
    }

    
    

export default ListaUsuario