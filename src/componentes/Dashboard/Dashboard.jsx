import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import { ProtectedElement } from '../ProtectedElement/ProtectedElement';

import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

import './Dashboard.css'

const Dashboard = () => {
    const baseURL = 'http://localhost:3010';
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserContext);
    const [estadistica, setEstadistica ] = useState(null);

    
    useEffect(()=>{
        // busco la info estadistica unicamente cuando sea presidente
        if(userData.user.tipoUsuario === 0){
            buscarEstadistica();
        }
    },[]); 
        
    
    const buscarEstadistica = async () =>{
        axios.get(baseURL + '/api/v1/estadistica/estadistica',{
            headers:{
                Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
            }
        })
        .then( resp => {
            setEstadistica(resp.data.dato);
        })
        .catch( error => {
            console.log(error);
        })
    }

    const irAConvocatoria = () => {
        navigate(`/privado/convocatoria`);        
    };

    const irAJugadores = () => {
        navigate(`/privado/crud`);        
    };


    return (userData.user ?
        <>
        <div className='container mt-3 mb-1 mb-5'>
            <h1 className='dashboardTitle'>¡ Bienvenido {userData.user.nombre} !</h1>
            
            <ProtectedElement mustBeEntrenador={true}>
            <div className='row align-items-center'>
                <div className="col-md-10 text-center">
                    <h2 className='dashboardH2'>Convocatorias</h2>
                </div>
                <div className="col-md-2 text-center">
                    <Button variant="primary" onClick={irAConvocatoria}>Ver</Button>
                </div>
            </div>
            <div className='row align-items-center'>
                <div className="col-md-10 text-center">
                    <h2 className='dashboardH2'>Futbolistas</h2>
                </div>
                <div className="col-md-2 text-center">
                    <Button variant="primary" onClick={irAJugadores}>Ver</Button>
                </div>
            </div>
            </ProtectedElement>

             <ProtectedElement mustBePresidente={true}>
                    <div className='container mt-5'>
                        <div className="row justify-content-center">
                            <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
                                <Card bg='success'>
                                    <Card.Body>
                                        <Card.Title>Futbolistas Creados</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Activos</Card.Subtitle>
                                        <Card.Text><h3>{(estadistica.totalFutbolistas)}</h3></Card.Text>                                   
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
                                <Card bg='info'>
                                    <Card.Body>
                                        <Card.Title>Convocatorias</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Con 26 convocados</Card.Subtitle>
                                        {/* <Card.Text><h3>{(estadistica.convocatoria)}</h3></Card.Text>                                      */}
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
                                <Card bg='info'>
                                    <Card.Body>
                                        <Card.Title>Próximo Partido</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Córdoba</Card.Subtitle>
                                        {/* <Card.Text><h3>{(estadistica.fechaProximoPartido)}</h3></Card.Text>                                        */}
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
            </ProtectedElement>

        </div>
        </> : <></>
    )
};

export { Dashboard };