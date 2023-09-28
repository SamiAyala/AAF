import { Fragment, useEffect, useState } from 'react';
import CardListaUsuarios from './Componentes/Cards/CardListaUsuarios';
import axios from 'axios';
import './Lista.css';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
//import { useState } from 'react';

function ListaUsuario() {
  const [Usuarios, setUsuarios] = useState([{}]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:5000/aaf/getUsers')
      .then(res => {
        console.log(res)
        setUsuarios(res.data)
      })
      .catch(e => {
      });
  }, []);
  const eliminarUsuario = (Id) => {
    axios.delete('http://localhost:5000/aaf/eliminarUsuario/' + Id)
      .then(res => {
        console.log(res)
      })
    window.location.reload();
  }
  const convertirUsuario = (id, value) => {
    const values = {
      "id": id,
      "rol": value
    }
    axios.put("http://localhost:5000/aaf/convertirUsuario", values)
      .then(res => {
        console.log(res)
        window.location.reload();
      })
  }

  return (
    <div>
      <Row style={{ padding: '4%' }}>
        {Usuarios.map(Usuario => <Col sm='auto'><CardListaUsuarios Usuario={Usuario} eliminarUsuario={eliminarUsuario} convertirUsuario={convertirUsuario}></CardListaUsuarios>
        </Col>)}
      </Row>
    </div>
  );
}




export default ListaUsuario