import './Card.css';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';

function CardClases({ Fecha, Horario, Titulo, Id, fkCurso }) {
    const navigate = useNavigate();
   return (
      <>
         <Card className='cardListas' style={{
            backgroundColor: 'rgb(3, 3, 73)'
         }}>
            <Card.Body >
               <Card.Title style={{ textAlign: 'center' }}><b>{Titulo}</b></Card.Title>
               <Card.Text>
                  Fecha:
                  <b>{Fecha}</b>
                  <br />
                  Horario:
                  <b>{Horario}</b>
                  <br />
               </Card.Text>
            </Card.Body>
            <Card.Footer>
            <Button onClick={() => navigate("/Asistencia/" + Id )}>Cursos</Button> 
            </Card.Footer>
         </Card>
      </>
   )
}
export default CardClases;