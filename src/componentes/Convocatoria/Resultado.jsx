
import "./Resultado.css";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';


import { useNavigate, useParams } from 'react-router-dom';


export const Resultado = (props) => {
    const { idConvocatoria, rival } = useParams();
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);


    return(
        <><h1>Resultado vs {rival}</h1></>
    );
}
