import './Noticia.css';
import React from 'react';
import Card from 'react-bootstrap/Card';
import dayjs from 'dayjs';

function Noticia ({ titulo = "", texto = "", footer = "", fecha = "", imagen = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fst2.depositphotos.com%2F1787005%2F7298%2Fi%2F600%2Fdepositphotos_72987231-stock-photo-lochernhead-scotland.jpg&tbnid=EqKn2ZJutVqTTM&vet=12ahUKEwixlv_7hbmAAxWqlZUCHQ_iDEkQMygJegUIARCwAQ..i&imgrefurl=https%3A%2F%2Fsp.depositphotos.com%2Fstock-photos%2Ffondos-de-pantalla.html&docid=NcRGaSh0cxIpyM&w=600&h=408&q=imagenes&safe=active&ved=2ahUKEwixlv_7hbmAAxWqlZUCHQ_iDEkQMygJegUIARCwAQ" })
 {
   const shortDate = dayjs(fecha).format("DD/MM/YY");
   return (

            <Card className='divNoticia'>
               <Card.Img style={{padding:'1rem'}} variant="top" src={imagen} />
               <Card.Body>
                  <Card.Title>{titulo}</Card.Title>
                  <Card.Text className='textoNoticia'>
                     {texto}
                  </Card.Text>
                  <Card.Footer><h6>Fecha de Creacion de la noticia: {shortDate}</h6>{footer}</Card.Footer>
               </Card.Body>
            </Card>
   )
}
export default Noticia;