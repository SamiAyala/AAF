import './Card.css';
import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { usuarioContext } from '../../Context/Context';

function CardClases({ Fecha, Horario, Titulo, Id, fkCurso}) {
    const navigate = useNavigate();
    const context = useContext(usuarioContext);
   let ids= {
      idCurso: fkCurso,
      idClase: Id,
   }
   console.log("IDS DE LA CARD:",ids)
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
            {context.usuarioLogeado.FkRol === 2 ? <Button onClick={() => navigate("/Asistencia/", {state:ids})}>Tomar asistencia</Button>  : <></>}
            
            </Card.Footer>
         </Card>
      </>
   )
}
export default CardClases;