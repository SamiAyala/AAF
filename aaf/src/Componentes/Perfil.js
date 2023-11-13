import './Perfil.css';
import { Form, useNavigate, useParams } from 'react-router-dom';
import { usuarioContext } from '../Context/Context';
import { useContext, useState } from 'react';
import perfilIcono from '../Imagenes/perfilIcono.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Modal } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import validator from 'validator';

function Perfil() {
  const [show, setShow] = useState(false);
  const [urlInput, setUrlInput] = useState();
  const [urlInvalido, setUrlInvalido] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
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

  const editarImagen = async () => {
    console.log(urlInput);
    if (validator.isURL(urlInput.url)) {
      setUrlInvalido(false);
      let body = { id: context.usuarioLogeado.Id, url: urlInput.url }
      console.log("body", body);
      console.log(context.usuarioLogeado);
      await axios.put('http://localhost:5000/aaf/editarFoto', body)
        .then(res => {
          console.log("res editarFoto", res);
          let usuarioAux = context.usuarioLogeado;
          usuarioAux.Imagen = urlInput.url;
          context.setUsuarioLogeado(usuarioAux);
          setShow(false);
        })
    } else setUrlInvalido(true);
  }

  const handleChange = (event) => {
    console.log("handleChange event", event);
    let url;
    setUrlInput({
      ...urlInput, url: event.target.value
    })
  }

  return (
    <div className='body'>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', fontSize: 'xx-large', fontWeight: 'bold', padding: '0px', alignItems: 'center', color: 'white' }}><p>Perfil </p></div>

      <Container className='divPerfil'>
        <Row >
          <Col><h3 style={{ fontWeight: 'bolder', fontSize: 30 }}>{context.usuarioLogeado.Nombre} {context.usuarioLogeado.Apellido}</h3></Col>
          <Col><Button onClick={navigateEditarPefil} className='btn btn-light form boton'>Editar Perfil</Button></Col>
        </Row>
        <Row>
          <Col sm={4} className='m-auto'><img src={context.usuarioLogeado.Imagen === undefined ? perfilIcono : context.usuarioLogeado.Imagen} className='d-block mx-auto img-fluid w-100'></img>
          </Col>
          <Col sm={4} className='sobreMi'>
            <Col>
              <h3>Sobre mi:</h3>
              <p className='aclaracion'>Rol: <p className='value'>{rol}</p></p>
              <hr />
              <p className='aclaracion'>Oficio: <p className='value'> {context.usuarioLogeado.Oficio}</p></p>
              <hr />
              <p className='aclaracion'>Fiscalia: <p className='value'>{context.usuarioLogeado.Fiscalia}</p></p>
              <hr />
              <p className='aclaracion'>Descripción: <p className='value'>{context.usuarioLogeado.Descripcion}</p></p>
            </Col>
          </Col>
          <Col sm={4} className='contacto'>
            <Col>
              <h3>Contacto: </h3>
              <p className='aclaracion'>Correo electronico:</p> <p className='value'>{context.usuarioLogeado.Mail}</p>
              <hr className='hr1'></hr>
              <p className='aclaracion'>Teléfono: <p className='value'>{context.usuarioLogeado.Telefono}</p></p>
            </Col>
          </Col>
        </Row>
        <Button onClick={logout} className='btn btn-danger logout'>Cerrar Sesión</Button>
        <Button onClick={handleShow} className='btn btn-secondary'>Editar Imagen</Button>
      </Container>
      {/*modal*/}
      <Modal className='MyModal' show={show} onHide={handleClose}>
        <Modal.Header closeButton id='modalBg'>
          <Modal.Title>Cambiar Imagen</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalBody' id='modalBg'>
          <label>Url</label>
          <br />
          <input type="text" placeholder="url" defaultValue={null} onChange={handleChange} maxlength="99999999"></input>
          {urlInvalido ? <p> El url ingresado no es válido. </p> : <></>}
        </Modal.Body>
        <Modal.Footer id='modalBg'>
          <Button variant="danger" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" type='submit' onClick={editarImagen}>
            Confirmar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Perfil;