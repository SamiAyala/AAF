import './Card.css';
import React from 'react';

function CardListaCursos({Titulo="", Descripcion="",Profesor="No se ha asignado ningún profesor aún."}) {
 return (
    <>
    {  
         <div className="cita">
            <p>Titulo : <span>{Titulo}</span></p>
            <p>Descipcion: <span>{Descripcion}</span></p>
            <p>Profesor asignado: <span>{Profesor}</span></p>
         </div>
    //<p>{text1} <span type="span">{text2}</span></p>
    }
    </>
)
}
export default CardListaCursos;