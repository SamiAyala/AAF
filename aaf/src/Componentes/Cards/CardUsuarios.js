import './Card.css';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

function CardUsuarios({ Nombre= "", Apellido= "", Fiscalia ="", Oficio="", Mail="", Telefono ="" }) {
   return (
      <>
         <Card className='cardListas' style={{
            backgroundColor: 'rgb(3, 3, 73)'
         }}>
            <Card.Body >
               <Card.Text>
                  Nombre y Apellido:
                  <br/>
                  <b>{Nombre} {Apellido}</b>
                  <br />
                  Fiscalia:
                  <br />
                  <b>{Fiscalia}</b>
                  <br />
                  Oficio:
                  <br />
                  <b>{Oficio}</b>
                  <br />
                  Mail:
                  <br />
                  <b>{Mail}</b>
                  <br />
                  Telefono:
                  <br />
                  <b>{Telefono}</b>
               </Card.Text>
            </Card.Body>
            <Card.Footer>
            </Card.Footer>
         </Card>
      </>
   )
}
export default CardUsuarios;