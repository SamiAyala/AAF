import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom'
import './IniciarSesion.css'
import axios from 'axios';
import {usuarioContext} from '../../Context/Context';


function EditarPerfil() {
  const context = useContext(usuarioContext);
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({});
  const Navigate = useNavigate();
  const perfil = context.usuarioLogeado;

    useEffect(() => {
      console.log("perfil editarperfil:",perfil)
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
    console.log("values editarperfil: ",values)
    axios.put('http://localhost:5000/aaf/editarperfil', values)
      .then(res => {
        context.setUsuarioLogeado(values)
        Navigate(`/perfil/${context.usuarioLogeado.Id}`)
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
            defaultValue={perfil.Nombre}
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
            defaultValue={perfil.Apellido}
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
            name="Contrasenia"
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
            placeholder="Telefono"
            defaultValue={perfil.Telefono}
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
            placeholder="Mail"
            defaultValue={perfil.Mail}
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
            defaultValue={perfil.Fiscalia}
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
            defaultValue={perfil.Oficio}
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
            defaultValue={perfil.Descripcion}
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