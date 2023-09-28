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
                     <Button onClick={() => eliminarUsuario(Usuario.Id)} variant='danger' class='button elimnar u-full-width'>Eliminar</Button>
                     </Col>
               </Row>
            </Card.Footer>
         </Card>
         {/*
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
   */}
      </>
   )
}
export default CardListaUsuarios;