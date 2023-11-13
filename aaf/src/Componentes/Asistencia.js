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
    const [presentes, setPresentes] = useState([{}]);
    const navigate = useNavigate();
    const context = useContext(usuarioContext);
    let bit = false;
    console.log("ids  .", dataFromNavigation);

    useEffect(() => {
        console.log("PRESENTES", presentes);
    }, [presentes])

    const tomarAsistencia = (id) => {
        let yaExiste = presentes.find(element => element.Id === id);
        if (typeof yaExiste === "undefined"){
            let index = alumnos.findIndex(element => element.Id === id);
            setPresentes([...presentes, alumnos[index]]);

            let body = {
                idUsuario: id,
                asistencia: true,
                idClase: dataFromNavigation.idClase,
            }

            axios.post('http://localhost:5000/aaf/tomarLista', body)
                .then(res => {
                    console.log("res",res);
                })
        } else {
            setPresentes(presentes.filter(presente => presente.id !== id));

            let body = {
                idUsuario: id,
                asistencia: false,
                idClase: dataFromNavigation.idClase,
            }

            /*axios.post("http://localhost:5000/aaf/tomarLista", body)
                .then(res => {
                    console.log("res2", res);
                })*/
        }

    }
    useEffect(() => {
        axios.get('http://localhost:5000/aaf/getAlumnos/' + dataFromNavigation.idCurso)
            .then(response => {
                console.log("response.data", response);
                setAlumnos(response.data);
            })
            .catch(e => {
            });

        axios.get('http://localhost:5000/aaf/getAsistencia/' + dataFromNavigation.idClase)
        .then(res => {
            setPresentes([...res.data])
        })
        .catch(e => {
        });
    }, []);
    console.log("Alumnos", alumnos)
    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', fontSize: 'xx-large', fontWeight: 'bold', padding: '0px', alignItems: 'center', color: 'white' }}><p>Tomar Asistencia </p></div>
            <Row style={{ padding: '4%' }}>
                {alumnos.map(alumno => <Col sm='auto'><CardUsuarios Nombre={alumno.nombre} Apellido={alumno.Apellido} Fiscalia={alumno.Fiscalia} Oficio={alumno.Oficio} Mail={alumno.Mail} Telefono={alumno.Telefono}></CardUsuarios>
                    <label>
                        <input type="checkbox" id="cbox1" value="first_checkbox" onClick={() => tomarAsistencia(alumno.Id)} /> {alumno.nombre}
                    </label>
                    <br />                </Col>)}
            </Row>
            <Button onClick={() => navigate("/ListaAsistencia/" + dataFromNavigation.idClase)}>Ver asistencia</Button>
        </div>
    );
}

export default Asistencia
