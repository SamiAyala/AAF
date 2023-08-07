import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './Componentes/Formularios/Registrar.css';
import CardListaCursos from './Componentes/Cards/CardListaCursos';
import axios from 'axios';
import './Lista.css'
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function ListaCursos() {
  const [Cursos, setCursos] = useState([{}]);
  const [Profesores, setProfesores] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
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
  }, []);

  const eliminarCurso = (Id) => {
    axios.delete('http://localhost:5000/aaf/eliminarCurso/' + Id)
      .then(res => {
        console.log(res)
      })
    window.location.reload();
  }
  const asignarProfesor = (IdProfesor, IdCurso) => {
    const values = {
      "idProfesor": IdProfesor,
      "idCurso": IdCurso
    }
    console.log("values: ", values)
    axios.put("http://localhost:5000/aaf/asignarProfesor", values)
      .then(res => {
        console.log(res)
        window.location.reload();
      })
  }

  return (
    <div>
    <Row style={{padding:'4%'}}>
      {Cursos.map(Curso => <Col sm={4}><CardListaCursos Titulo={Curso.Titulo} Descripcion={Curso.Descripcion} Profesor={Curso.fkProfesor} eliminarCurso={eliminarCurso} asignarProfesor={asignarProfesor} Profesores={Profesores} Id={Curso.Id} fkProfesor={Curso.fkProfesor}></CardListaCursos>
      </Col>)}
    </Row>
    <footer>
      <Button onClick={()=> navigate("/CrearCursos")}>Crear Curso</Button>
    </footer>
    </div>
  );


}




export default ListaCursos