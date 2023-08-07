import './Home.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Noticia from './Noticia';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function Home() {
   const [noticias, setNoticias] = useState([{}]);
   const [adm,setAdm] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      axios.get('http://localhost:5000/aaf/getNoticias')
         .then(res => {
            setNoticias(res.data);
         })
   }, [])

   return (
      <div className='body'>
         <div>
         
           <Row className='justify-content-md-center'>
            {noticias.map(noticia => <Col sm={8}  style={{marginTop:'2%'}}><Noticia titulo={noticia.Titulo} texto={noticia.Texto} imagen={noticia.Imagen} footer={noticia.Footer} fecha={noticia.Fecha}></Noticia></Col>)}
            <Button onClick={()=> navigate("/AgregarNoticia")}>Crear Noticia</Button>
            </Row> 
        </div>
        </div>
   )
}