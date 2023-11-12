import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './Formularios/Registrar.css';
import CardListaCursos from './Cards/CardListaCursos';
import axios from 'axios';
import './Lista.css'
import { Row, Col } from 'react-bootstrap';
import { useNavigate, useParams} from 'react-router-dom';
import { usuarioContext, isAdmContext } from '../Context/Context';
import CardClases from './Cards/CardClases';


function ListaClases() {
    let { id } = useParams();
  const [Clases, setClases] = useState([{}]);
  const isAdm = useContext(isAdmContext);
  const usuario = useContext(usuarioContext);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:5000/aaf/getClases/' + id )
      .then(res => {
        setClases(res.data)
      })
      .catch(e => {
      });
  }, []);
    console.log("Clases", Clases);

  return (
    <div>
      <Row style={{ padding: '4%', paddingTop:'1%' }}>
        <Row><Col style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', fontSize: 'xx-large', fontWeight: 'bold', padding: '0px', alignItems: 'center' }}><p style={{ color: 'white' }}>Clases</p></Col></Row>
        {Clases.map(Clase =>
          <Col sm='auto' key={Clase.Id}>
            <CardClases Titulo={Clase.Titulo} Fecha={Clase.Feecha} Horario={Clase.Horario} Id={Clase.Id} fkCurso ={Clase.fkCurso} />
          </Col>)}
      </Row>
      <footer>
      <Button onClick={() => navigate("/ListaCursos")}>Cursos</Button> 
      </footer>
    </div>
  );


}




export default ListaClases
