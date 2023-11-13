import { useParams } from "react-router-dom";
import { useState, useEffect, useContext} from "react";
import axios from "axios";
import { Row, Col, Container } from 'react-bootstrap';
import CardListaUsuarios from './Cards/CardListaUsuarios';
import { usuarioContext , isAdmContext, isProContext } from '../Context/Context';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './Cards/Card.css';
import './VerDetalleCurso.css';

function VerDetalleCursos() {
    const navigate = useNavigate();
    const [curso, setCurso] = useState({})
    const [isLoading, setLoading] = useState(true)
    const { id } = useParams();
    const isPro = useContext(isProContext);
    const context = useContext(usuarioContext);
    let val = false;
    console.log("rol de ahora",context.usuarioLogeado.FkRol)
    console.log("CONTEXTEANDO",context.usuarioLogeado)
    if(context.usuarioLogeado.FkRol=== 2){
       val= true
    }
    useEffect(() => {
        axios.get('http://localhost:5000/aaf/getMaterial/' + id)
            .then(response => {
                console.log("response.data", response)
                setCurso(response.data)
            })
            .finally(() => { setLoading(false) })
    }, [])
    return (
        <Row style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '0px', alignItems: 'center',height:'70vh'}}><Col sm={6}>
        <Card>
      <Card.Img id="bgCard" variant="top" src={curso.Imagen} />
      <Card.Body id="bgCard">
        <Card.Title>{curso.titulo}</Card.Title>
        <Card.Text>
        <p className="aclaracion">Descripcion: <p className="value">{curso.Texto}</p></p>
                    <p className="aclaracion">Link de materiales: <p className="value">{curso.LinkMateriales}</p></p>
                    <p className="aclaracion">Link del zoom: <p className="value">{curso.Zoom}</p></p>
                    <p>{curso.Texto}</p>
        </Card.Text>
      </Card.Body>
      
      <Card.Footer id="bgCard">
        <Row>
      {val ? <Col><Button onClick={()=> navigate("/AgregarMaterial/" + id)}>AgregarMaterial</Button></Col> : <></>}
                    {val ? <Col><Button onClick={()=> navigate("/CrearClase/" + id)}>Crear Clase</Button></Col> : <></>}
                    <Col><Button onClick={()=> navigate("/ListaClases/" + id)}>Clases</Button></Col>
                    </Row>
      </Card.Footer>
    </Card>
    </Col>
    </Row>
    );
}

export default VerDetalleCursos;
