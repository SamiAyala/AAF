import { useState } from 'react';
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
function CrearCurso() {
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({});
  const [camposVacios, setcamposVacios] = useState(false);
  const Navigate = useNavigate('/ListaCursos');
  let mensaje;
  const handleChange = (event) => {
    setValues({...values, [event.target.name]:event.target.value 
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setcamposVacios(false);
    const form =event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    if(event.target.titulo.value=== "" || event.target.descripcion.value=== ""){
        mensaje =  "Complete todos los campos. "
        setcamposVacios(true)
      }
      if(mensaje === undefined){
        axios.post('http://localhost:5000/aaf/crearCurso', values)
          .then(res => {
            Navigate('/ListaCursos') 
          })
          .catch(e => {
          }); }
          else {
            console.log ("mensaje: ",mensaje);
          }
          setValidated(true);
      };
      return (
        <div className='container'>
          <Form onSubmit={(e) => handleSubmit(e)} noValidate validated={validated} className='form'>
            <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue=""
                name="titulo"
                onChange={handleChange}
              />
            </Form.Group>
            <br></br>
            <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
              <Form.Label>Descipcion</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue=""
                name="descripcion"
                onChange={handleChange}
              />
            </Form.Group>
            { camposVacios ? <h5>Completa todos los campos</h5> : <h5></h5> }
            <br></br>
            <Button type="submit" className='form'>crear Curso</Button>
            <Link to="/ListaCursos" className="btn btn-light form">Lista de los cursos</Link>
          </Form>
        </div>
      );
  };


export default CrearCurso;