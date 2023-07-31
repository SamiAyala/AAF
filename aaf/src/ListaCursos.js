import { Fragment, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './Componentes/Formularios/Registrar.css';
import CardListaCursos from './Componentes/Cards/CardListaCursos';
import axios from 'axios';
import './ListaUsuario.css'
import { Row,Col } from 'react-bootstrap';


function ListaCursos() {
  const [Cursos, setCursos] = useState([{}]);
  const [Profesores, setProfesores] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/aaf/getCursos')
      .then(res => {
        setCursos(res.data)
      })
      .catch(e => {
      });
      axios.get('http://localhost:5000/aaf/getProfesores')
      .then(res => {
        setProfesores(res.data);
      })
    }, []);

  const eliminarCurso = (Id) => {
    axios.delete('http://localhost:5000/aaf/eliminarCurso/' + Id)
      .then(res => {
        console.log(res)
      })
    window.location.reload();
  }
  const asignarProfesor = (IdProfesor,IdCurso) =>{
    const values={
      "idProfesor":IdProfesor,
      "idCurso":IdCurso
    }
    console.log("values: ",values)
    axios.put("http://localhost:5000/aaf/asignarProfesor",values)
    .then(res=>{
      console.log(res)
      window.location.reload();
    })
  }

  return (
    <Row>
      {Cursos.map(Curso =><Col sm={4}><CardListaCursos Titulo={Curso.Titulo} Descripcion={Curso.Descripcion} Profesor={Curso.fkProfesor}></CardListaCursos>
        <Button onClick={() => eliminarCurso(Curso.Id)} className='button elimnar u-full-width'>Eliminar</Button> 
      <DropdownButton className='margenes' id="dropdown-basic-button" title={Curso.fkProfesor===null ? "Asignar Profesor" : "Cambiar Profesor Asignado"}>
      {Profesores.map(Profesor => <Dropdown.Item className='margenes' onClick={() => asignarProfesor(Profesor.Id,Curso.Id)}>{Profesor.Nombre} {Profesor.Apellido}</Dropdown.Item>)}
    </DropdownButton>
      </Col>)}
    </Row>
  );


}




export default ListaCursos