import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from 'react-bootstrap';
import CardListaUsuarios from './Cards/CardListaUsuarios';

function VerDetalleCursos() {
    const [curso, setCurso] = useState({})
    const [isLoading, setLoading] = useState(true)
    const { Id } = useParams();
    const [alumnos, setAlumnos] = useState([{}]);
    let asistencia = false;
    let fecha = new Date();
    useEffect(() => {
        axios.get('http://localhost:5000/aaf/getMaterial/' + Id)
            .then(response => {
                console.log("response.data", response)
                setCurso(response.data)
            })
        axios.get('http://localhost:5000/aaf/getAlumnos' + Id)
            .then(response => {
                console.log("response.data", response)
                setAlumnos(response.data)
            })
            .finally(() => { setLoading(false) })
    }, [])
    return (
        <div className='container'>
            {isLoading ? <></> : (
                <>
                    <img src={curso.Imagen} />
                    <h3>Titulo: {curso.Titulo}</h3>
                    <h2>Descripcion: {curso.Descripcion}</h2>
                    <h2>{curso.Texto}</h2>
                    <div>
                        <Row style={{ padding: '4%' }}>
                            {alumnos.map(alumno => <Col sm='auto'><CardListaUsuarios Usuario={alumno}></CardListaUsuarios>
                                <label>
                                    <input type="checkbox" id="cbox1" value="first_checkbox" onClick={() => axios.post('http://localhost:5000/aaf/tomarLista', alumno.id, curso.Id, fecha, asistencia = true)} /> {alumno.nombre}
                                     </label>
                                <br />                </Col>)}
                        </Row>
                    </div>
                </>


            )}
        </div>
    );
}

export default VerDetalleCursos;
