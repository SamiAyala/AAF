import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Registrar.css';
import {Link} from 'react-router-dom'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';

function CrearClase() {
    let { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({});
  const [camposVacios, setcamposVacios] = useState(false);
  const Navigate = useNavigate('/ListaCursos');
  let mensaje = "";
  console.log("SOYOGAYAGYAGYA",id)
  const handleChange = (event) => {
    setValues({...values, [event.target.name]:event.target.value
    })
    console.log("datos", event.target.value)
  }
  console.log("VALORES:", values);
  const handleSubmit = (event) => {
    console.log("EEVEENTO", event)
    event.preventDefault();
    event.stopPropagation();
    setcamposVacios(false);
    const form =event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    if(values.fecha=== "" || values.horario=== ""){
        mensaje =  "Complete todos los campos (El de imagen puede estar vacio). "
        setcamposVacios(true)
        return
      }
        axios.post('http://localhost:5000/aaf/insertClase', {values: values, id:id})
          .then(res => {
            Navigate('/ListaCursos') 
          })
          .catch(e => {
          }); 
           setValidated(true);
        }
         

      return (
        <div className='container'>
          <Form onSubmit={(e) => handleSubmit(e)} noValidate validated={validated} className='form'>
            <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                required
                type="date"
                defaultValue=""
                name="Fecha"
                onChange={handleChange}
              />
            </Form.Group>
            <br></br>
            <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
              <Form.Label>Horario</Form.Label>
              <Form.Control
                required
                type="time"
                defaultValue=""
                name="Horario"
                onChange={handleChange}
              />
            </Form.Group>
           
            <br></br>
            <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue=""
                name="Titulo"
                onChange={handleChange}
              />
            </Form.Group>
            <br></br>
            { camposVacios ? <h5>Completa todos los campos</h5> : <h5></h5> }
            <Button type="submit" className='form'>Crear clase</Button>
            <Link to="/ListaCursos" className="btn btn-light form">Cursos</Link>
          </Form>
        </div>
      );
  };


export default CrearClase;