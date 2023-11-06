
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import perfilIcono from '../Imagenes/perfilIcono.png';
import logoAAF from '../Imagenes/logoAAF.png';
import { Link,Outlet} from 'react-router-dom';
import { useContext, useEffect} from 'react';
import {usuarioContext,isAdmContext} from '../Context/Context';
import './Layout.css';

const Layout = () => {
    const context = useContext(usuarioContext);
    const isAdm = useContext(isAdmContext);

    useEffect(()=>{
        console.log("typeof context",typeof context.usuarioLogeado)
        console.log("context Usuario",context.usuarioLogeado)
        console.log("isAdm?",isAdm);
    })

    return (
        <>
            <Navbar className='navBar'>

                <Navbar.Brand> <Link to='/'><img src={logoAAF} style={{ width: "20%", height: "auto" }}></img></Link></Navbar.Brand>
                <Nav className="me-auto">
                    <Link to="/ListaCursos" className='text'>Cursos</Link>
                </Nav>
                <Nav className="me-auto">
                    <Link to="/MisCursos" className='text'>Mis Cursos</Link>
                </Nav>
                <Nav className="me-auto">
                    <Link to="/ListaCursos" className='text'>Calendario</Link>
                </Nav>
                <Navbar.Brand>{typeof context.usuarioLogeado === "string" ? <Link to="/IniciarSesion"><img src={perfilIcono} style={{ width: "10%", height: "auto" }}></img></Link> : <Link state={context.usuarioLogeado} to={`/Perfil/${context.usuarioLogeado.Id}`}><img src={context.usuarioLogeado.Imagen===undefined ? perfilIcono : context.usuarioLogeado.Imagen} style={{ width: "10%", height: "auto" }}></img></Link>}</Navbar.Brand>
            </Navbar>
            <Outlet/>
        </>
    )
}
export default Layout;