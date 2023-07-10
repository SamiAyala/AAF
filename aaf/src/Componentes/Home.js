import './Home.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import perfilIcono from '../Imagenes/perfilIcono.jpg';
import logoAAF from '../Imagenes/logoAAF.png';
import {Link} from 'react-router-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
     const [usuario,setUsuario] = useState();
     let { id } = useParams();
     const {state} = useLocation();
     const Navigate = useNavigate();
     const perfil = state; 
     if (perfil === null)
     {
        setUsuario(false)
     }
     else{
        setUsuario(true)
     }
    return (
        <body>
            <Navbar className='navBar'>
                <Container>
                    <Navbar.Brand> <Link to='/Home'><img src={logoAAF} style={{width:"20%" , height:"auto"}}></img></Link></Navbar.Brand>
                    <Nav className="me-auto">
                       <Link to="/ListaCursos" className='text'>Cursos</Link>
                    </Nav>
                    {usuario ? <Link to="/IniciarSesion"><img src={perfilIcono} style={{width:"20%" , height:"auto"}}></img></Link> : <Link params={{perfil}} to={'/Perfil/${perfil.id}'}><img src={perfilIcono} style={{width:"20%" , height:"auto"}}></img></Link> }
                </Container>
            </Navbar><Navbar className='navBar'></Navbar>
        </body>
    )
}