import React from "react";

const usuarioContext = React.createContext([]);
const isAdmContext = React.createContext(false);
const isProContext = React.createContext(false);
const idsAsistencia = React.createContext([]);

export {usuarioContext ,  isAdmContext, isProContext, idsAsistencia };