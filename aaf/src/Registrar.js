import { useState } from 'react';
import Button from 'react-bootstrap/Button';
/*import Col from 'react-bootstrap/Col';*/
import Form from 'react-bootstrap/Form';
/*import InputGroup from 'react-bootstrap/InputGroup';*/
/*import Row from 'react-bootstrap/Row';*/
import './Registrar.css';
import {Link} from 'react-router-dom'
import axios from 'axios';

function FormRegistro() {
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({});
  //const Navigate = useNavigate();
  const handleChange = (event) => {
    setValues({...values, [event.target.name]:event.target.value 
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log(values)
    console.log(event.target)
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    axios.post('http://localhost:5000/aaf/registrarse', values)
      .then(res => {
        console.log("soygay")
        //Navigate('/iniciarSesion') 
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
            name="nombre"
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
            name="apellido"
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Contraseña"
            defaultValue=""
            name="contraseña"
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
          <Form.Label>Confirmar Contraseña</Form.Label>
          <Form.Control
            required
            type="text"
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
            name="telefono"
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
            name="mail"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
          <Form.Label>Rol</Form.Label>
          <Form.Control
            required
            type="text"
            defaultValue=""
            name="rol"
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        <Button type="submit" className='form'>Registrarse</Button>
        <Link to="/iniciarSesion" className="btn btn-light form">Iniciar Sesion</Link>
      </Form>
    </div>
  );
}

export default FormRegistro;