import { useState } from 'react';
import Button from 'react-bootstrap/Button';
/*import Col from 'react-bootstrap/Col';*/
import Form from 'react-bootstrap/Form';
/*import InputGroup from 'react-bootstrap/InputGroup';*/
/*import Row from 'react-bootstrap/Row';*/
import './Registrar.css';
import axios from 'axios';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

function FormIniciarSesion() {
  const [Mail, setMail] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const Navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    let nuevoUsuario = {
      mail: Mail,
      contraseña: Contraseña,
    };
    console.log(nuevoUsuario);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } 

    axios.post('http://localhost:5000/aaf/login', nuevoUsuario)
    .then(res => {
      console.log("LOGIN: ", res)
      Navigate(`/Home`, { state: res.data })
    })
    .catch(e => {
      console.log(e)
      alert("Los campos Ingresados no coinciden con ningun usuario. Por favor revisarlos.")
    });

  };

  return (
    <div className='container'>
    <Form onSubmit={(e) => handleSubmit(e)} className='form'>
    <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
        <Form.Label>Mail</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="mail"
            defaultValue=""
            onChange={(event) =>
              setMail(event.target.value)
            }
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
            onChange={(event) =>
              setContraseña(event.target.value)
            }
          /> 
        </Form.Group>
        <br></br>
        <Button type="submit" className='form'>Iniciar Sesión</Button>
        <Link to="/" className="btn btn-light form">Registrar</Link>
    </Form>
    </div>
  );
}
export default FormIniciarSesion;