import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import { ProtectedElement } from '../ProtectedElement/ProtectedElement';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

import './Dashboard.css'
import "../Login/Login.css"
const Dashboard = () => {
    const baseURL = 'http://localhost:3005';
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserContext);
    const [estadistica, setEstadistica ] = useState(String);
    const jugadorPelota = require('./pateando una pelota.png');
    const jugadorPelota2 = require('./pateando una pelota2.png');
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
            console.log(estadistica)
            console.log('total f',estadistica.totalFutbolistas)
            console.log('fecha prox',estadistica.fechaProximaConvocatoria)

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
            <div className='container mt-3'>
        <div className='row justify-content-center'>
            <div className='col-md-6 text-center'>
                <h2 className='dashboardH2'>Convocatorias</h2>
                <Button variant='primary' onClick={irAConvocatoria}>Ver</Button>
            </div>
            
            <div className='col-md-6 text-center'>
                <h2 className='dashboardH2'>Futbolistas</h2>
                <Button variant='primary' onClick={irAJugadores}>Ver</Button>
            </div>
            <div>
                <img src={jugadorPelota2} alt="Jugador pateando una pelota2" className="jugador-pelota-im" />
            </div>
        </div>
        </div>
            </ProtectedElement>

             <ProtectedElement mustBePresidente={true}>
                    <div className='container mt-5'>
                        <div className="row justify-content-center">
                            <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Futbolistas Creados</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Activos</Card.Subtitle>
                                        <Card.Text><h3>{(estadistica.totalFutbolistas)}</h3></Card.Text>                                   
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Convocatorias</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Total</Card.Subtitle>
                                        <Card.Text><h3>{(estadistica.convocatorias)}</h3></Card.Text>                                     
                                    </Card.Body>
                                </Card>
                            </div>
                            
                            <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
                            <Card className="custom-card">
                            <Card.Body>
                                <Card.Title>Próximo Partido</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Fecha</Card.Subtitle>
                                <Card.Text>
                                    <h3 className="black-text">{(estadistica.fechaProximaConvocatoria)}</h3>
                                </Card.Text>                                       
                            </Card.Body>
                             </Card>

                            
                                <div>
                                    <img src={jugadorPelota} alt="Jugador pateando una pelota" className="jugador-pelota-img" />
                                </div>
                    
                            </div>
                        </div>
                    </div>
            </ProtectedElement>

        </div>
        </> : <></>
    )
};

export { Dashboard };