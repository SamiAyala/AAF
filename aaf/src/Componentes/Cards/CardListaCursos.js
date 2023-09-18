import './Card.css';
import React from 'react';
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function CardListaCursos({ Titulo = "", Descripcion = "", Profesor = "No se ha asignado ningún profesor aún.",eliminarCurso,asignarProfesor,Profesores,Id,fkProfesor,isAdm }) {
   return (
      <>
         {
            <div className="cita">
               <p><b>Título : </b><span>{Titulo}</span></p>
               <p><b>Descripción: </b><span>{Descripcion}</span></p>
               <p><b>Profesor asignado:</b> <span>{Profesor}</span></p>
               {isAdm ? <Row>
               <Col><DropdownButton className='margenes' id="dropdown-basic-button" title={fkProfesor === null ? "Asignar Profesor" : "Cambiar Profesor Asignado"}>
                  {Profesores.map(Profesor => <Dropdown.Item className='margenes' onClick={() => asignarProfesor(Profesor.Id, Id)}>{Profesor.Nombre} {Profesor.Apellido}</Dropdown.Item>)}
               </DropdownButton></Col>
                <Col><Button onClick={() => eliminarCurso(Id)} className='button elimnar u-full-width'>Eliminar</Button></Col></Row>: <></>}
            </div>
         }
      </>
   )
}
export default CardListaCursos;