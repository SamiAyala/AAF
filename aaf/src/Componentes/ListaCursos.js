import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './Formularios/Registrar.css';
import CardListaCursos from './Cards/CardListaCursos';
import axios from 'axios';
import './Lista.css'
import { Row, Col } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { usuarioContext, isAdmContext } from '../Context/Context';


function ListaCursos() {
  const [Cursos, setCursos] = useState([{}]);
  const [Profesores, setProfesores] = useState([]);
  const [recargar, setRecargar] = useState(false);
  const isAdm = useContext(isAdmContext);
  const usuario = useContext(usuarioContext);
  const navigate = useNavigate();
  useEffect(() => {
    setRecargar(false);
    axios.get('http://localhost:5000/aaf/getCursos')
      .then(res => {
        setCursos(res.data)
      })
      .catch(e => {
      });
    axios.get('http://localhost:5000/aaf/getProfesores')
      .then(res => {
        setProfesores(res.data);
      })
    console.log("cursos lista", Cursos);
  }, [recargar]);

  const eliminarCurso = (Id) => {
    axios.delete('http://localhost:5000/aaf/eliminarCurso/' + Id)
      .then(res => {
        console.log(res)
        setRecargar(true);
      })
  }
  const asignarProfesor = (IdProfesor, IdCurso) => {
    const values = {
      "idProfesor": IdProfesor,
      "idCurso": IdCurso
    }
    console.log("values: ", values)
    axios.put("http://localhost:5000/aaf/asignarProfesor", values)
      .then(res => {
        console.log(res);
        setRecargar(true);
      })
  }


  return (
    <div>
      <Row style={{ padding: '4%', paddingTop:'1%' }}>
        <Row><Col style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', fontSize: 'xx-large', fontWeight: 'bold', padding: '0px', alignItems: 'center' }}><p style={{ color: 'white' }}>Todos los cursos</p></Col></Row>
        {Cursos.map(Curso =>
          <Col sm='auto' key={Curso.Id}>
            <CardListaCursos Titulo={Curso.Titulo} Descripcion={Curso.Descripcion} Profesor={Curso.NombreProfesor} eliminarCurso={eliminarCurso} asignarProfesor={asignarProfesor} Profesores={Profesores} Id={Curso.Id} fkProfesor={Curso.fkProfesor} isAdm={isAdm.isAdm} idUsuario={usuario.usuarioLogeado.Id} />
          </Col>)}
      </Row>
      <footer>
        {isAdm.isAdm ? <Button onClick={() => navigate("/CrearCursos")}>Crear Curso</Button> : <></>}
      </footer>
    </div>
  );


}




export default ListaCursos