import { useContext, useEffect, useState } from 'react';
import './Formularios/Registrar.css';
import axios from 'axios';
import './Lista.css'
import { Row, Col } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { usuarioContext, isAdmContext } from '../Context/Context';
import CardMisCursos from './Cards/CardMisCursos';


function MisCursos() {
  const [Cursos, setCursos] = useState([{}]);
  const [recargar, setRecargar] = useState(false);
  const usuario = useContext(usuarioContext);
  useEffect(() => {
    setRecargar(false);
    axios.get('http://localhost:5000/aaf/getMisCursos/' + usuario.usuarioLogeado.Id)
      .then(res => {
        setCursos(res.data)
      })
      .catch(e => {
      });
    console.log("cursos mis", Cursos);
  }, [recargar]);

  return usuario.usuarioLogeado.Id===undefined ? <Col style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', fontSize: 'xx-large', fontWeight: 'bold', padding: '0px', alignItems: 'center', height:'70vh' }}><p style={{ color: 'white' }}>Inicie Sesión</p></Col>
  :(
    <div>
      <Row style={{ padding: '4%', paddingTop:'1%' }}>
        <Row><Col style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', fontSize: 'xx-large', fontWeight: 'bold', padding: '0px', alignItems: 'center' }}><p style={{ color: 'white' }}>Mis cursos</p></Col></Row>
        { Cursos[0].Id === undefined ? <Col style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', fontSize: 'x-large', padding: '0px', alignItems: 'center',height:'0vh' }}><p style={{ color: 'white' }}>No se ha anotado a ningún curso.</p></Col> :  
        Cursos.map(Curso =>
          <Col sm='auto' key={Curso.Id}>
            <CardMisCursos Titulo={Curso.Titulo} Descripcion={Curso.Descripcion} Profesor={Curso.NombreProfesor} fkProfesor={Curso.fkProfesor}  />
          </Col>)}
      </Row>
    </div>
  );


}




export default MisCursos;