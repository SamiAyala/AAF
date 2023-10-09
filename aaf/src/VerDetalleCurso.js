import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function VerDetalleCursos() {
    const [curso, setCurso] = useState({})
    const [isLoading, setLoading] = useState(true)
    const { Id } = useParams();
    useEffect(() => {
        axios.get('http://localhost:5000/aaf/getMaterial/' + Id)
            .then(response => {
                console.log("response.data",response)
                setCurso(response.data)
            })
            .finally(() => { setLoading(false) })
    }, [])
    return (
            <div className='container'>
                {isLoading ? <h1></h1> : (
                    <>
                        <img src={curso.Imagen}/>
                        <h3>Titulo: {curso.Titulo}</h3>
                        <h2>Descripcion: {curso.Descripcion}</h2>
                        <h2>{curso.Texto}</h2>
                    </>

                )}
            </div>
    );
}

export default VerDetalleCursos;