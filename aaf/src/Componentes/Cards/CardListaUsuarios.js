import './Card.css';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

function CardListaUsuarios({ Usuario, eliminarUsuario, convertirUsuario }) {
   return (
      <>
         <Card className='cardListas' style={{
            backgroundColor: 'rgb(3, 3, 73)'
         }}>
            <Card.Body >
               <Card.Title style={{ textAlign: 'center' }}><b>{Usuario.Rol}</b></Card.Title>
               <Card.Text>
                  Nombre y Apellido:
                  <br/>
                  <b>{Usuario.Nombre} {Usuario.Apellido}</b>
                  <br />
                  Fiscalia:
                  <br />
                  <b>{Usuario.Fiscalia}</b>
                  <br />
                  Oficio:
                  <br />
                  <b>{Usuario.Oficio}</b>
                  <br />
                  Mail:
                  <br />
                  <b>{Usuario.Mail}</b>
                  <br />
                  Telefono:
                  <br />
                  <b>{Usuario.Telefono}</b>
               </Card.Text>
            </Card.Body>
            <Card.Footer>
               <Row>
                  <Col sm='auto'>
                     <DropdownButton id="dropdown-basic-button" title="Cambiar Rol">
                     <Dropdown.Item onClick={() => convertirUsuario(Usuario.Id, 1)}>Alumno</Dropdown.Item>
                     <Dropdown.Item onClick={() => convertirUsuario(Usuario.Id, 2)}>Profesor</Dropdown.Item>
                  </DropdownButton>
                  </Col>
                  <Col sm='auto'>
                     <Button onClick={() => eliminarUsuario(Usuario.Id)} variant='danger' className='button elimnar u-full-width'>Eliminar</Button>
                     </Col>
               </Row>
            </Card.Footer>
         </Card>
      </>
   )
}
export default CardListaUsuarios;