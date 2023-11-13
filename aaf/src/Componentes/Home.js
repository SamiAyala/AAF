import './Home.css'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Noticia from './Noticia';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { usuarioContext , isAdmContext } from '../Context/Context';

export default function Home() {
   const [noticias, setNoticias] = useState([]);
   const navigate = useNavigate();
   const context = useContext(usuarioContext);
   const isAdm = useContext(isAdmContext);

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
            {noticias.map(noticia => <Col sm={8} key={noticia.Id}  style={{marginTop:'1%',marginBottom:'2%'}}><Noticia titulo={noticia.Titulo} texto={noticia.Texto} imagen={noticia.Imagen} footer={noticia.Footer} fecha={noticia.Fecha}></Noticia></Col>)}
            {isAdm.isAdm ? <Button onClick={()=> navigate("/AgregarNoticia")}>Crear Noticia</Button> : <></>}
            </Row> 
        </div>
        </div>
   )
}