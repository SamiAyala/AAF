import { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Registrar.css';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
//import { useState } from 'react';

function ListaUsuario(){
    const [Usuarios, setUsuarios] = useState([{}]); 
    axios.get('http://localhost:5000/aaf/getUsers')
    .then(res => {
        setUsuarios(res)
      })
      .catch(e => {
      }); 
      /*return ({Usuarios.map(Usuarios =><div className='usuarios'><Card nombreMascota={cita.mascota} nombreDueño={cita.dueño} fecha={cita.fecha} hora={cita.hora} sintomas={cita.sintomas}></Card>         
      <button onClick={() => eliminarCita(citas.indexOf(cita))} class='button elimnar u-full-width'>Eliminar</button> </div>)}  
      );*/  
    }
   
    

export default ListaUsuario