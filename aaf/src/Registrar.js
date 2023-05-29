import { useState } from 'react';
import Button from 'react-bootstrap/Button';
/*import Col from 'react-bootstrap/Col';*/
import Form from 'react-bootstrap/Form';
/*import InputGroup from 'react-bootstrap/InputGroup';*/
/*import Row from 'react-bootstrap/Row';*/
import './Registrar.css';

function FormRegistro() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className='container'>
    <Form noValidate validated={validated} onSubmit={handleSubmit} className='form'>
        <Form.Group /*as={Col} md="4"*/  controlId="validationCustom01">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="nombre"
            defaultValue=""
          />
        </Form.Group>
        <br></br>
        <Form.Group /*as={Col} md="4"*/  controlId="validationCustom02">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="apellido"
            defaultValue=""
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
          />  
        </Form.Group>
        <br></br>
        <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
          <Form.Label>Mail</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="mail   "
            defaultValue=""
          />  
        </Form.Group>
        <br></br>
        <Button type="submit" className='form'>Registrarse</Button>
    </Form>
    </div>
  );
}

export default FormRegistro;