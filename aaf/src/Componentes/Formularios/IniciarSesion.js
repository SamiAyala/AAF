import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Registrar.css';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { usuarioContext, isAdmContext } from '../../Context/Context';
import validator from 'validator';

function FormIniciarSesion() {
  const [Mail, setMail] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const [Recargar, setRecargar] = useState(false);
  const Navigate = useNavigate();
  const context = useContext(usuarioContext);
  const isAdm = useContext(isAdmContext);




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
        console.log("res.data: ", res.data);
        let imagen = undefined;
        if (res.data.Imagen !== null) {
          if (validator.isURL(res.data.Imagen)) {
            console.log("validator true");
            imagen = res.data.Imagen;
          } else {
            console.log("validator false");
          }
        }
        context.setUsuarioLogeado({ Id: res.data.Id, Nombre: res.data.Nombre, Apellido: res.data.Apellido, FkRol: res.data.FkRol, Contrasenia: res.data.Contrasenia, Telefono: res.data.Telefono, Mail: res.data.Mail, Fiscalia: res.data.Fiscalia, Oficio: res.data.Oficio, Descripcion: res.data.Descripcion, Imagen: imagen });
        setRecargar(true);
        let auxBool;
        res.data.FkRol === 3 ? auxBool = true : auxBool = false;
        isAdm.setIsAdm(auxBool);
        console.log(nuevoUsuario);
        Navigate(`/`)
      })
      .catch(e => {
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
            placeholder="Mail"
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
        <Link to="/Registrarse" className="btn btn-light form">Registrar</Link>
      </Form>
    </div>
  );
}
export default FormIniciarSesion;