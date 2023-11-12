import { Fragment, useEffect, useState } from 'react';
import CardListaUsuarios from './Cards/CardListaUsuarios';
import axios from 'axios';
import './Lista.css';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate,useParams } from 'react-router-dom';
//import { useState } from 'react';

function ListaAsistencia() {
    let {id} = useParams();
  const [Usuarios, setUsuarios] = useState([{}]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:5000/aaf/getAsistencia',id)
      .then(res => {
        console.log(res)
        setUsuarios(res.data)
      })
      .catch(e => {
      });
  }, []);

  return (
    <div>
      <Row style={{ padding: '4%' }}>
        {Usuarios.map(Usuario => <Col sm='auto'><CardListaUsuarios Usuario={Usuario}></CardListaUsuarios>
        </Col>)}
      </Row>
    </div>
  );
}




export default ListaAsistencia