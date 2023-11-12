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
    if(values.imagen=== "" || values.texto=== "" || values.zoom=== ""){
        mensaje =  "Complete todos los campos (El de imagen puede estar vacio). "
        setcamposVacios(true)
        return
      }
        axios.post('http://localhost:5000/aaf/insertMaterial', {values: values, id:id})
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
            <br></br>
            <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
              <Form.Label>Texto</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue=""
                name="Texto"
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
                name="Zoom"
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