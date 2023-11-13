import { Fragment, useContext, useEffect, useState } from 'react';
import CardUsuarios from './Cards/CardUsuarios';
import axios from 'axios';
import './Lista.css';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { usuarioContext } from '../Context/Context';

//import { useState } from 'react';

function Asistencia() {
    const location = useLocation();
    const dataFromNavigation = location.state;
    const [alumnos, setAlumnos] = useState([{}]);
    const navigate = useNavigate();
    const context = useContext(usuarioContext);
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
        console.log(res.data);
      })

    }
    /* let yaExiste = carrito.findIndex(producto => producto.id === prod.id);
    if(yaExiste === -1) SetCarrito([...carrito, {...prod, cantidad: 1}]);
    else {
      SetCarrito(carrito.map(producto => producto.id === prod.id ? {...producto, cantidad: producto.cantidad + 1} : producto));
    }*/ 
    useEffect(() => {
        axios.get('http://localhost:5000/aaf/getAlumnos/' + dataFromNavigation.idCurso)
            .then(response => {
                console.log("response.data", response)
                let yaExiste = alumnos.findIndex(alumno => alumno.id === alum.id);
                if(yaExiste === -1) setAlumnos(response.data);
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
