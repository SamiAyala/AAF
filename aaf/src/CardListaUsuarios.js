import './Card.css';
import React from 'react';

function CardListaUsuarios({Nombre="", Apellido="",Fiscalia="",Oficio="",Mail="", Telefono="", Rol=""}) {
 return (
    <>
    {  
         <div class="cita">
            <p>Nombre : <span>{Nombre}</span></p>
            <p>Apellido: <span>{Apellido}</span></p>
            <p>Fiscalia: <span>{Fiscalia}</span></p>
            <p>Oficio: <span>{Oficio}</span></p>
            <p>Mail: <span>{Mail}</span></p>
            <p>Telefono: <span>{Telefono}</span></p>
            <p>Rol: <span>{Rol}</span></p>
         </div>
    //<p>{text1} <span type="span">{text2}</span></p>
    }
    </>
)
}
export default CardListaUsuarios;