import { useParams } from "react-router-dom";
import { useState, useEffect, useContext} from "react";
import axios from "axios";
import { Row, Col } from 'react-bootstrap';
import CardListaUsuarios from './Cards/CardListaUsuarios';
import { usuarioContext , isAdmContext, isProContext } from '../Context/Context';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function VerDetalleCursos() {
    const navigate = useNavigate();
    const [curso, setCurso] = useState({})
    const [isLoading, setLoading] = useState(true)
    const { id } = useParams();
    const isPro = useContext(isProContext);
    const context = useContext(usuarioContext);
    useEffect(() => {
        axios.get('http://localhost:5000/aaf/getMaterial/' + id)
            .then(response => {
                console.log("response.data", response)
                setCurso(response.data)
            })
            .finally(() => { setLoading(false) })
    }, [])
    return (
        <div className='container'>
            {isLoading ? <></> : (
                <>
                    <img src={curso.Imagen} />
                    <h3>Titulo: {curso.titulo}</h3>
                    <h2>Descripcion: {curso.Texto}</h2>
                    <h2>Link de materiales: {curso.LinkMateriales}</h2>
                    <h2>Link del zoom: {curso.Zoom}</h2>
                    <h2>{curso.Texto}</h2>
                    <div>
                    {isPro ? <Button onClick={()=> navigate("/AgregarMaterial/" + id)}>AgregarMaterial</Button> : <></>}
                    {isPro ? <Button onClick={()=> navigate("/CrearClase/" + id)}>Crear Clase</Button> : <></>}
                    <Button onClick={()=> navigate("/ListaClases/" + id)}>Clases</Button>  
                    </div>
                </>
            )}
        </div>
    );
}

export default VerDetalleCursos;
