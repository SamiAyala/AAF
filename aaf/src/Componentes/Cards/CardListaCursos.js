import './Card.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function CardListaCursos({ Titulo = "", Descripcion = "", Profesor = "No se ha asignado ningún profesor aún.", eliminarCurso, asignarProfesor, cargarMaterial, Profesores, Id, fkProfesor, isAdm, idUsuario }) {
   const Navigate = useNavigate('/AgregarMateriales');

   const anotarse = () => {
      let body = { Id, idUsuario }
      if (idUsuario !== undefined) {
         axios.post('http://localhost:5000/aaf/anotarAlumno', body)
            .then(res => {
               console.log("res",res)
               alert("Ha sido anotado correctamente.");
            })
      } else {
         alert("Inicie sesión o regístrese primero.");
      }
   }

   return (
      <Card className='cardListas' style={{
         backgroundColor: 'rgb(3, 3, 73)'
      }}>
         <Card.Body>
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
         <Card.Footer>
            <Row>
               {isAdm ?
               <>
                  <Col sm='auto'>
                     <DropdownButton className='margenes button' id="dropdown-basic-button" title={fkProfesor === null ? "Asignar Profesor" : "Cambiar Profesor Asignado"}>
                        {Profesores.map(Profesor => <Dropdown.Item key={Profesor.Id} className='margenes' onClick={() => asignarProfesor(Profesor.Id, Id)}>{Profesor.Nombre} {Profesor.Apellido}</Dropdown.Item>)}
                     </DropdownButton>
                  </Col>
                  <Col sm='auto'>
                     <Button onClick={() => Navigate('/AgregarMaterial/' + Id)} variant='secondary' className='button u-full-width'>Agregar Material</Button>
                  </Col>
                  <Col sm='auto'>
                     <Button onClick={() => eliminarCurso(Id)} variant='danger' className='button u-full-width'>Eliminar</Button>
                  </Col>
               </>
                  :
                  <Col sm='auto'>
                  <Button onClick={() => anotarse()} className="button">Anotarme</Button>
                  </Col>
               }
               <Col sm='auto'>
               <Button onClick={()=> Navigate('/VerDetalle/' + Id)} variant="secondary" className='button u-full-width'>Ver Detalles</Button>
               </Col>
            </Row>
         </Card.Footer>
      </Card>
   )
}
export default CardListaCursos;