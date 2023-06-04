import './Perfil.css';
import './Julian.jpg';    
import Button from 'react-bootstrap/Button';
//mport {useLocation} from 'react-router-dom';

function Perfil (usuario){
  //const location = useLocation();
  //console.log(location.state.Id)
  return(
   <div className='container'>
      <Button type="submit" className='boton'>Editar perfil</Button>
    <img src={require('./Julian.jpg')} className='foto'></img>
    <div className='sobreMi'>
        <h2>Sobre mi: </h2>
        <hr ></hr>
        <h3>Oficio: Fiscal</h3>
        <hr ></hr>
        <h3>Cursos: Corrupción Informática</h3>
        <hr ></hr>
     </div>
     <div className='contacto'>
        <h2>Contacto: </h2>
        <hr className='hr1'></hr>
        <h3>Correo electronico: julicjulian@gmail.com</h3>
        <hr className='hr1'></hr>
        <h3>Teléfono: 011-1540-4699</h3>
     </div>
   </div>    
  )
}
export	default Perfil;