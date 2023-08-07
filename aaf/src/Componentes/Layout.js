
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import perfilIcono from '../Imagenes/perfilIcono.png';
import logoAAF from '../Imagenes/logoAAF.png';
import { Link,Outlet,useLocation } from 'react-router-dom';
import { useEffect,useState} from 'react';
import './Layout.css';

const Layout = () => {
    const [usuario, setUsuario] = useState(false);
    const { state } = useLocation();
    const perfil = state;

    useEffect(() => {
        if (perfil === null) {
            setUsuario(false)
        }
        else {
            setUsuario(true)
        }
    }, [])
    return (
        <>
            <Navbar className='navBar'>

                <Navbar.Brand> <Link to='/'><img src={logoAAF} style={{ width: "20%", height: "auto" }}></img></Link></Navbar.Brand>
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
                <Navbar.Brand>{!usuario ? <Link to="/IniciarSesion"><img src={perfilIcono} style={{ width: "10%", height: "auto" }}></img></Link> : <Link state={perfil} to={`/Perfil/${perfil.Id}`}><img src={perfilIcono} style={{ width: "10%", height: "auto" }}></img></Link>}</Navbar.Brand>
            </Navbar>
            <Outlet/>
        </>
    )
}
export default Layout;