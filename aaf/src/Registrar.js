import { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
/*import Col from 'react-bootstrap/Col';*/
import Form from 'react-bootstrap/Form';
/*import InputGroup from 'react-bootstrap/InputGroup';*/
/*import Row from 'react-bootstrap/Row';*/
import './Registrar.css';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

/*function CustomAlert() {
  this.ok = function(){
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
  }

  this.alert = function(message,title){
    document.body.innerHTML = document.body.innerHTML + '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';

    let dialogoverlay = document.getElementById('dialogoverlay');
    let dialogbox = document.getElementById('dialogbox');
    
    let winH = window.innerHeight;
    dialogoverlay.style.height = winH+"px";
    
    dialogbox.style.top = "100px";

    dialogoverlay.style.display = "block";
    dialogbox.style.display = "block";
    
    document.getElementById('dialogboxhead').style.display = 'block';

    if(typeof title === 'undefined') {
      document.getElementById('dialogboxhead').style.display = 'none';
    } else {
      document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> '+ title;
    }
    document.getElementById('dialogboxbody').innerHTML = message;
    document.getElementById('dialogboxfoot').innerHTML = '<button class="pure-material-button-contained active">OK</button>';
    document.getElementById('dialogboxfoot').onclick = this.ok;
  }
}

let customAlert = new CustomAlert();
*/
function FormRegistro() {
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({});
  const [noCoinciden, setNoCoinciden] = useState(false);
  const Navigate = useNavigate('/iniciarSeesion');
  const handleChange = (event) => {
    setValues({...values, [event.target.name]:event.target.value 
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setNoCoinciden(false);
    const form =event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log(event.target.confirmarContraseña.value);
    let mensaje1 = ""; 
    let mensaje2 = ""; 
    let mensaje3 = ""; 

    if (event.target.contraseña.value !== event.target.confirmarContraseña.value)
    {
      mensaje1 = "Las contraseñas no coinciden. "
    }      
    if(event.target.nombre.value=== "" || event.target.apellido.value=== "" || event.target.mail.value=== "" || event.target.contraseña.value=== "" || event.target.confirmarContraseña.value=== "" || event.target.telefono.value=== "" || event.target.fiscalia.value=== "" || event.target.oficio.value=== "" ){
      mensaje2 =  "Complete todos los campos. "
    }
    if (!/@gmail\.com$/.test(event.target.mail.value)) {
      mensaje3 = "Mail Incorrecto, Este tiene que terminar con @gmail.com " 
  }
   if(mensaje1 === "" && mensaje2 === "" && mensaje3 === ""){
    axios.post('http://localhost:5000/aaf/registrarse', values)
      .then(res => {
        Navigate('/iniciarSesion') 
      })
      .catch(e => {
      }); }
      else {
        console.log (mensaje1, mensaje2, mensaje3);
        //alert((<h1 className='TituloAlert'>mensaje1</h1>));
        //alert(mensaje1);
        setNoCoinciden(true);
      }
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
            type="password"
            placeholder="Contraseña"
            defaultValue=""
            name="contraseña"
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        { noCoinciden ? <h4>Las contraseñas no coinciden zapato</h4> : <h4></h4> }
        <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
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
            type="email"
            placeholder="mail"
            defaultValue=""
            name="mail"
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
            name="fiscalia"
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
            name="oficio"
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