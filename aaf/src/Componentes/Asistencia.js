import { Fragment, useEffect, useState } from 'react';
import CardUsuarios from './Cards/CardUsuarios';
import axios from 'axios';
import './Lista.css';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

//import { useState } from 'react';

function Asistencia() {
    const location = useLocation();
    const dataFromNavigation = location.state;
    const [alumnos, setAlumnos] = useState([{}]);
    const navigate = useNavigate();
    let bit = false;
    console.log("ids  .",dataFromNavigation);
   const tomarAsistencia = (id)=>{
     let body = {
        idUsuario:id,
        asistencia: true,
        idClase: dataFromNavigation.idClase,
     }
     axios.post('http://localhost:5000/aaf/tomarLista',body)
     .then(res => {
        console.log("papas gratis:",res.data);
      })
    }
    useEffect(() => {
        axios.get('http://localhost:5000/aaf/getAlumnos/' + dataFromNavigation.idCurso)
            .then(response => {
                console.log("response.data", response)
                setAlumnos(response.data)
            })
            .catch(e => {
            });
    }, []);
    console.log("Alumnos",alumnos)
    return (
        <div>
            <Row style={{ padding: '4%' }}>
                {alumnos.map(alumno => <Col sm='auto'><CardUsuarios Nombre={alumno.nombre} Apellido={alumno.Apellido} Fiscalia ={alumno.Fiscalia} Oficio={alumno.Oficio} Mail={alumno.Mail} Telefono ={alumno.Telefono}></CardUsuarios>
                    <label>
                        <input type="checkbox" id="cbox1" value="first_checkbox" onClick={ () => tomarAsistencia(alumno.Id) } /> {alumno.nombre}
                    </label>
                    <br />                </Col>)}
            </Row>
            <Button onClick={() => navigate("/ListaAsistencia/" + dataFromNavigation.idClase)}>Ver asistencia</Button> 
        </div>
    );
}

export default Asistencia
