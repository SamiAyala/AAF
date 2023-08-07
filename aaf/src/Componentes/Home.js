import './Home.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import perfilIcono from '../Imagenes/perfilIcono.png';
import logoAAF from '../Imagenes/logoAAF.png';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Noticia from './Noticia'

export default function Home() {
   const [usuario, setUsuario] = useState(false);
   let { id } = useParams();
   const { state } = useLocation();
   const Navigate = useNavigate();
   const perfil = state;
   const [noticias, setNoticias] = useState([]);

   useEffect(() => {
      if (perfil === null) {
         setUsuario(false)
      }
      else {
         setUsuario(true)
      }
      axios.get('http://localhost:5000/aaf/getNoticias')
         .then(res => {
            setNoticias(res.data);
         })
   }, [])

   return (
      <div className='body'>
         <div>
         <Navbar className='navBar'>
            <Navbar.Brand> <Link to='/'><img src={logoAAF} style={{ width: "23%", height: "auto" ,marginLeft:'30%' }}></img></Link></Navbar.Brand>
            <Nav className="me-auto">
               <Link to="/ListaCursos" className='text'>Cursos</Link>
            </Nav>
            <Nav className="me-auto">
               <Link to="/ListaCursos" className='text'>Mis Cursos</Link>
            </Nav>
            <Nav className="me-auto">
               <Link to="/ListaCursos" className='text'>Calendario</Link>
            </Nav>
            <Nav className="me-auto">  
               <Link to="/ListaCursos" className='text'>Mis Chats</Link>
            </Nav>
           <Navbar.Brand> {!usuario ? <Link to="/IniciarSesion"><img src={perfilIcono} style={{ width: "10%", height: "auto" }}></img></Link> : <Link state={perfil} to={`/Perfil/${perfil.Id}`}><img src={perfilIcono} style={{ width: "20%", height: "auto" }}></img></Link>}</Navbar.Brand>
         </Navbar></div>
         <Row className='justify-content-md-center'>
            {noticias.map(noticia => <Col sm={8} style={{ marginTop: '2%' }}><Noticia titulo={noticia.Titulo} texto={noticia.Texto} imagen={noticia.Imagen} footer={noticia.Footer} fecha={noticia.Fecha}></Noticia></Col>)}
         </Row>
      </div>
   )
}