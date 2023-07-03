import './Card.css';
import React from 'react';

function CardListaCursos({Titulo="", Descripcion=""}) {
 return (
    <>
    {  
         <div class="cita">
            <p>Titulo : <span>{Titulo}</span></p>
            <p>Descipcion: <span>{Descripcion}</span></p>
         </div>
    //<p>{text1} <span type="span">{text2}</span></p>
    }
    </>
)
}
export default CardListaCursos;