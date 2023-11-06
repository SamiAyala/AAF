import './Perfil.css';
import { useNavigate, useParams } from 'react-router-dom';
import { usuarioContext } from '../Context/Context';
import { useContext } from 'react';
import perfilIcono from '../Imagenes/perfilIcono.png';

function Perfil() {
  let { id } = useParams();
  const Navigate = useNavigate();
  const context = useContext(usuarioContext)
  let rol = null;

  if (context.usuarioLogeado.FkRol === 1) {
    rol = "Alumno"
  } else if (context.usuarioLogeado.FkRol === 2) {
    rol = "Profesor"
  } else {
    rol = "Administrador"
  }

  const navigateEditarPefil = () => {
    Navigate(`/EditarPerfil/${context.usuarioLogeado.Id}`);
  }

  const logout = () => {

    context.setUsuarioLogeado('');
    Navigate('/')

  }

  return (
    <>
    <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',fontSize:'xx-large',fontWeight:'bold',padding:'0px',alignItems:'center',color:'white'}}><p>Perfil </p></div>
      
    <div className='divPerfil'>
      <button onClick={navigateEditarPefil} className='btn btn-light form boton'>Editar Perfil</button>
      <h3>{context.usuarioLogeado.Nombre} {context.usuarioLogeado.Apellido}</h3>
      <img src={context.usuarioLogeado.Imagen===undefined ? perfilIcono : context.usuarioLogeado.Imagen} className='foto'></img>
      <div className='sobreMi'>
        <h2>Sobre mi: </h2>
        <h3>Rol: {rol}</h3>
        <hr/>
        <h3>Oficio: {context.usuarioLogeado.Oficio}</h3>
        <hr/>
        <h3>Fiscalia: {context.usuarioLogeado.Fiscalia}</h3>
        <hr/>
        <h3>Descripción: {context.usuarioLogeado.Descripcion}</h3>
      </div>
      <div className='contacto'>
        <h2>Contacto: </h2>
        <h3>Correo electronico: {context.usuarioLogeado.Mail}</h3>
        <hr className='hr1'></hr>
        <h3>Teléfono: {context.usuarioLogeado.Telefono}</h3>
      </div>
      <button onClick={logout} className='btn btn-danger logout'>Cerrar Sesión</button>
    </div>
    </>
  );
}

export default Perfil;