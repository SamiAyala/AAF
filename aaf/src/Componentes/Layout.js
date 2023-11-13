
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import perfilIcono from '../Imagenes/perfilIcono.png';
import logoAAF from '../Imagenes/logoAAF.png';
import { Link,Outlet} from 'react-router-dom';
import { useContext, useEffect} from 'react';
import {usuarioContext,isAdmContext} from '../Context/Context';
import './Layout.css';
import { Col, Container, Row } from 'react-bootstrap';

const Layout = () => {
    const context = useContext(usuarioContext);
    const isAdm = useContext(isAdmContext);

    useEffect(()=>{
        console.log("typeof context",typeof context.usuarioLogeado)
        console.log("context Usuario",context.usuarioLogeado)
        console.log("isAdm?",isAdm);
    })

    return (
        <Row style={{width:'auto'}}>
            <Navbar className='navBar' style={{paddingLeft:'2%',paddingRight:'2%'}}>
                <Navbar.Brand><Link to='/'>
                    <img src={logoAAF} width="auto" height="60vh" className="align-top"></img>
                    </Link></Navbar.Brand>
                <Nav>
                    <Link to="/ListaCursos" className='text'>Cursos</Link>
                </Nav>
                <Nav className="me-auto">
                    <Link to="/MisCursos" className='text'>Mis Cursos</Link>
                </Nav>
                {isAdm.isAdm ? <Nav>
                    <Link to="/ListaUsuarios" className='text'>Usuarios</Link>
                </Nav> : <></>}
                
                <Navbar.Brand>{typeof context.usuarioLogeado === "string" ? <Link to="/IniciarSesion">  <img src={perfilIcono} width="auto" height="60vh" className="d-inline-block align-top"></img></Link> : <Link state={context.usuarioLogeado} to={`/Perfil/${context.usuarioLogeado.Id}`}><img width="auto" height="60vh" className="d-inline-block align-top" src={context.usuarioLogeado.Imagen===undefined ? perfilIcono : context.usuarioLogeado.Imagen}></img></Link>}</Navbar.Brand>
            </Navbar>
            <Outlet/>
        </Row>
    )
}
export default Layout;