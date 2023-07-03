import { Fragment, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Registrar.css';
import {Link, json} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import CardListaCursos from './CardListaCursos.js';
import axios from 'axios';
import './ListaUsuario.css'
//import { useState } from 'react';

function ListaCursos(){
    const [Cursos, setCursos] = useState([{}]); 
    useEffect(() => {  
      axios.get('http://localhost:5000/aaf/getCursos')
        .then(res => {
          console.log(res)
          setCursos(res.data)
        })
        .catch(e => {
        }); 
    }, []);
    const eliminarCurso = (Id) =>{
        axios.delete('http://localhost:5000/aaf/eliminarCurso/' + Id)
        .then(res => {
          console.log(res)
        })
        window.location.reload();
  }
    return (
      <div>
        {Cursos.map(Curso =><div><CardListaCursos Titulo={Curso.Titulo} Descripcion={Curso.Descripcion} ></CardListaCursos>            
        <button onClick={() => eliminarCurso(Curso.Id)} class='button elimnar u-full-width'>Eliminar</button>
        </div>)}
      </div>
    ); 
    }

    
    

export default ListaCursos