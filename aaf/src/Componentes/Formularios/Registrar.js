import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Registrar.css';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { usuarioContext, isAdmContext } from '../../Context/Context';

function FormRegistro() {
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({});
  const [noCoinciden, setNoCoinciden] = useState(false);
  const [camposVacios, setcamposVacios] = useState(false);
  const [mailIncorrecto, setmailIncorrecto] = useState(false);
  const [mailUnico, setMailUnico] = useState(true);
  const [mails, setMails] = useState('');
  const Navigate = useNavigate('/iniciarSesion');
  const context = useContext(usuarioContext);
  const isAdm = useContext(isAdmContext);

  const handleChange = (event) => {
    setValues({
      ...values, [event.target.name]: event.target.value
    })
  }

  useEffect(() => {
    axios.get('http://localhost:5000/aaf/getMails').then(res => {
      setMails(res.data);
    })
  }, [])

  let esUnico = async (mail) => {
    let r = true;
    mails.forEach(m => {
      if (mail === m.mail) r = false;
    });
    return r;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setNoCoinciden(false);
    setcamposVacios(false);
    setmailIncorrecto(false);
    setMailUnico(true);

    console.log(event.target.confirmarContraseña.value);
    let mensaje = "";

    if (event.target.contraseña.value !== event.target.confirmarContraseña.value) {
      mensaje = "Las contraseñas no coinciden. "
      setNoCoinciden(true);
    }
    if (event.target.nombre.value === "" || event.target.apellido.value === "" || event.target.mail.value === "" || event.target.contraseña.value === "" || event.target.confirmarContraseña.value === "" || event.target.telefono.value === "" || event.target.fiscalia.value === "" || event.target.oficio.value === "") {
      mensaje = "Complete todos los campos. "
      setcamposVacios(true)

    }
    if (!/\S+@\S+\.\S+/.test(event.target.mail.value)) {
      mensaje = "Formato de email incorrecto. "
      setmailIncorrecto(true)
    }
    let r = await esUnico(event.target.mail.value);
    if (r===false) {
      mensaje = "Este mail ya está en uso."
      setMailUnico(false);
    }


    if (mensaje === "") {
      axios.post('http://localhost:5000/aaf/registrarse', values)
        .then(res => {
          console.log("res.data", res.data)
          let auxBool;
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
        res.data.FkRol === 3 ? auxBool = true : auxBool = false;
          isAdm.setIsAdm(auxBool);
          Navigate('/');
        })
        .catch(e => {
        });
    }
    else {
    }
    setValidated(true);
  };

  return (
    <div className='container'>
      <Form onSubmit={(e) => handleSubmit(e)} noValidate validated={validated} className='form'>
        <Form.Group controlId="validationCustom01">
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
        <Form.Group controlId="validationCustom02">
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
        <Form.Group controlId="validationCustom02">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Contraseña"
            defaultValue=""
            name="contraseña"
            onChange={handleChange}
          />
        </Form.Group>
        {noCoinciden ? <h5>Las contraseñas no coinciden.</h5> : <h5></h5>}
        <br></br>
        <Form.Group controlId="validationCustom02">
          <Form.Label>Confirmar Contraseña</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="confirmar contraseña"
            defaultValue=""
            name="confirmarContraseña"
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        <Form.Group controlId="validationCustom02">
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
        <Form.Group controlId="validationCustom02">
          <Form.Label>Mail</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="mail"
            defaultValue=""
            name="mail"
            onChange={handleChange}
          />
        </Form.Group>
        {mailIncorrecto ? <h5>Formato del mail incorrecto </h5> : <h5></h5>}
        {!mailUnico ? <h5>El Mail ya esta en uso. </h5> : <h5></h5>}
        <br></br>
        <Form.Group controlId="validationCustom02">
          <Form.Label>Fiscalia</Form.Label>
          <Form.Control
            required
            type="text"
            defaultValue=""
            name="fiscalia"
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        <Form.Group controlId="validationCustom02">
          <Form.Label>Oficio</Form.Label>
          <Form.Control
            required
            type="text"
            defaultValue=""
            name="oficio"
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        <Form.Group controlId="validationCustom02">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            required
            type="text"
            defaultValue=""
            name="descripcion"
            onChange={handleChange}
          />
        </Form.Group>
        {camposVacios ? <h5>Completa todos los campos</h5> : <h5></h5>}
        <br></br>
        <Button type="submit" className='form'>Registrarse</Button>
        <Link to="/iniciarSesion" className="btn btn-light form">Iniciar Sesion</Link>
      </Form>
    </div>
  );
}

export default FormRegistro;