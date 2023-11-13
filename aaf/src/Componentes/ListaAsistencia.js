import { Fragment, useEffect, useState } from 'react';
import CardUsuarios from './Cards/CardUsuarios';
import axios from 'axios';
import './Lista.css';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate,useParams } from 'react-router-dom';
//import { useState } from 'react';

function ListaAsistencia() {
    let {id} = useParams();
    console.log("ID params", id)
  const [Usuarios, setUsuarios] = useState([{}]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:5000/aaf/getAsistencia/' + id)
      .then(res => {
        console.log("res",res)
        setUsuarios(res.data)
      })
      .catch(e => {
      });
  }, []);
  console.log("usuarios de lista asistencia tomada", Usuarios)

  return (
    <div>
      <Row style={{ padding: '4%' }}>
        {Usuarios.map(Usuario => <Col sm='auto'><CardUsuarios Nombre={Usuario.nombre} Apellido={Usuario.Apellido} Fiscalia ={Usuario.Fiscalia} Oficio={Usuario.Oficio} Mail={Usuario.Mail} Telefono ={Usuario.Telefono}></CardUsuarios>
        </Col>)}
      </Row>
    </div>
  );
}




export default ListaAsistencia