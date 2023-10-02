import './Card.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
<<<<<<< HEAD
import axios from 'axios';

=======
import { Link } from "react-router-dom";
>>>>>>> eef1c63d63b00b4a08c2ce5430ee0d405c6f65c7

function CardListaCursos({ Titulo = "", Descripcion = "", Profesor = "No se ha asignado ningún profesor aún.", eliminarCurso, asignarProfesor, cargarMaterial, Profesores, Id, fkProfesor, isAdm, idUsuario }) {
   const Navigate = useNavigate('/AgregarMateriales');
<<<<<<< HEAD


   const anotarse = () => {
      console.log("anotarse")
      let body = { Id, idUsuario }
      if (idUsuario !== undefined){   
         axios.post("http://localhost:5000/aaf/anotarAlumno",body)
         .then(res => {
            alert("Ha sido anotado correctamente.");
         })
      } else {
         alert("Inicie sesión o regístrese primero.");
      }
=======


   const verDetalle = () => {
     
>>>>>>> eef1c63d63b00b4a08c2ce5430ee0d405c6f65c7
   }

   return (
      <>
         <Card className='cardListas' style={{
            backgroundColor: 'rgb(3, 3, 73)'
         }}>
            <Card.Body >
               <Card.Title style={{ textAlign: 'center' }}><b>{Titulo}</b></Card.Title>
               <Card.Text>
                  {Descripcion}
                  <br />
                  {
                     fkProfesor === null ?
                        <b>No se ha asignado un profesor aún</b>
                        :
                        <>
                           Profesor Asignado:
                           <br />
                           <b>{Profesor}</b>
                        </>
                  }
               </Card.Text>
            </Card.Body>
            {isAdm ?
               <Card.Footer>
                  <Row>
                     <Col sm='auto'>
                        <DropdownButton className='margenes' id="dropdown-basic-button" title={fkProfesor === null ? "Asignar Profesor" : "Cambiar Profesor Asignado"}>
                           {Profesores.map(Profesor => <Dropdown.Item key={Profesor.Id} className='margenes' onClick={() => asignarProfesor(Profesor.Id, Id)}>{Profesor.Nombre} {Profesor.Apellido}</Dropdown.Item>)}
                        </DropdownButton>
                     </Col>
                     <Col sm='auto'>
                        <Button onClick={() => Navigate('/AgregarNoticia', Id)} variant='secondary' className='button elimnar u-full-width'>Agregar Material</Button>
                     </Col>
                     <Col sm='auto'>
                        <Button onClick={() => eliminarCurso(Id)} variant='danger' className='button elimnar u-full-width'>Eliminar</Button>
                     </Col>
                  </Row>
               </Card.Footer>
<<<<<<< HEAD
               : <Button onClick={() => anotarse()}>
                  Anotarme
               </Button>}
=======
               : 
               <Link to={"/VerDetalle/"+Id}>Ver Detalles</Link>

            }
>>>>>>> eef1c63d63b00b4a08c2ce5430ee0d405c6f65c7
         </Card>
      </>
   )
}
export default CardListaCursos;