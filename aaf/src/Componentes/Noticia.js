import './Noticia.css';
import React from 'react';
import Card from 'react-bootstrap/Card';

function Noticia ({ titulo = "", texto = "", footer = "", fecha = "", imagen = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fst2.depositphotos.com%2F1787005%2F7298%2Fi%2F600%2Fdepositphotos_72987231-stock-photo-lochernhead-scotland.jpg&tbnid=EqKn2ZJutVqTTM&vet=12ahUKEwixlv_7hbmAAxWqlZUCHQ_iDEkQMygJegUIARCwAQ..i&imgrefurl=https%3A%2F%2Fsp.depositphotos.com%2Fstock-photos%2Ffondos-de-pantalla.html&docid=NcRGaSh0cxIpyM&w=600&h=408&q=imagenes&safe=active&ved=2ahUKEwixlv_7hbmAAxWqlZUCHQ_iDEkQMygJegUIARCwAQ" })
 {
   return (
      <>
         {
            <Card style={{ width: '80rem' }}>
               <Card.Img variant="top" src={imagen} />
               <Card.Body>
                  <Card.Title>{titulo}</Card.Title>
                  <Card.Text>
                     <h6>Fecha de Creacion de la noticia: {fecha}</h6>
                    <h5>{texto}</h5>
                  </Card.Text>
                  <Card.Footer>{footer}</Card.Footer>
               </Card.Body>
            </Card>
            /*<div className="card">
               <h1 className='titulo'>{titulo}</h1>     
               <h6 className='fecha'>Fecha de Creacion de la noticia:{fecha}</h6>
               <img className='imagen'src={imagen}/>
               <h5 className='texto'>{texto}</h5>
               <h6 className='footer'>{footer}</h6>
            </div>*/
         }
      </>
   )
}
export default Noticia;