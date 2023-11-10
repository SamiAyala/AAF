import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Registrar.css';
import {Link} from 'react-router-dom'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';

function AgregarMaterial() {
    let { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({});
  const [camposVacios, setcamposVacios] = useState(false);
  const Navigate = useNavigate('/ListaCursos');
  let mensaje;
  const handleChange = (event) => {
    setValues({...values, [event.target.name]:event.target.value
    })
    console.log("datos", event.target.value)
  }
  console.log("VALORES:", values);
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setcamposVacios(false);
    const form =event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    if(event.target.imagen.value=== "" || event.target.texto.value=== "" || event.target.Zoom.value=== ""){
        mensaje =  "Complete todos los campos (El de imagen puede estar vacio). "
        setcamposVacios(true)
      }
      if(mensaje === undefined){
        axios.post('http://localhost:5000/aaf/insertMaterial', values, id)
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
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                required
                type="file"
                defaultValue=""
                name="imagen"
                onChange={handleChange}
              />
            </Form.Group>
            <br></br>
            <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
              <Form.Label>Texto</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue=""
                name="texto"
                onChange={handleChange}
              />
            </Form.Group>
           
            <br></br>
            <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
              <Form.Label>Links de pdf, drives, etc</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue=""
                name="LinkMateriales"
                onChange={handleChange}
              />
            </Form.Group>
            <br></br>
            <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
              <Form.Label>Link del Zoom</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue=""
                name="zoom"
                onChange={handleChange}
              />
            </Form.Group>
            <br></br>
            { camposVacios ? <h5>Completa todos los campos</h5> : <h5></h5> }
            <Button type="submit" className='form'>Cargar material</Button>
            <Link to="/ListaCursos" className="btn btn-light form">Cursos</Link>
          </Form>
        </div>
      );
  };


export default AgregarMaterial;