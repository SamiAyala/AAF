import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
/*import Col from 'react-bootstrap/Col';*/
import Form from 'react-bootstrap/Form';
/*import InputGroup from 'react-bootstrap/InputGroup';*/
/*import Row from 'react-bootstrap/Row';*/
import './Registrar.css';
import {Link, useLocation} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';


function EditarPerfil() {
    const {state} = useLocation();
    const perfil = state;
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({});
  const Navigate = useNavigate();

    useEffect(() => {
        setValues({...perfil});
    }, []);

  const handleChange = (event) => {
    setValues({...values, [event.target.name]:event.target.value 
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    axios.put('http://localhost:5000/aaf/editarperfil', values)
      .then(res => {
        Navigate(`/perfil/${perfil.Id}`, {state: values})
      })
      .catch(e => {
        console.log(e.response.status, e.data);
      });
    setValidated(true);
  };

  return (
    <div className='container'>
      <Form onSubmit={(e) => handleSubmit(e)} noValidate validated={validated} className='form'>
        <Form.Group /*as={Col} md="4"*/ controlId="validationCustom01">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="nombre"
            defaultValue=""
            name="Nombre"
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="apellido"
            defaultValue=""
            name="Apellido"
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Contraseña"
            defaultValue=""
            name="Contraseña"
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
          <Form.Label>Confirmar Contraseña</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="confirmar contraseña"
            defaultValue=""
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
          <Form.Label>Telefono</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="telefono"
            defaultValue=""
            name="Telefono"
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
          <Form.Label>Mail</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="mail"
            defaultValue=""
            name="Mail"
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
          <Form.Label>Fiscalia</Form.Label>
          <Form.Control
            required
            type="text"
            defaultValue=""
            name="Fiscalia"
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
          <Form.Label>Oficio</Form.Label>
          <Form.Control
            required
            type="text"
            defaultValue=""
            name="Oficio"
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            required
            type="text"
            defaultValue=""
            name="Descripcion"
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        <Button type="submit" className='form'>Guardar</Button>
      </Form>
    </div>
  );
}

export default EditarPerfil;