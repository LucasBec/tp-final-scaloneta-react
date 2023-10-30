import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
// import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import { ProtectedElement } from '../ProtectedElement/ProtectedElement';

import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import './Dashboard.css'

const Dashboard = () => {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserContext);

    const irAConvocatoria = () => {
        navigate(`/privado/convocatoria`);        
    };

    const irAJugadores = () => {
        navigate(`/privado/crud`);        
    };

    return (userData.user ?
        <>
        <div className='container mt-3 mb-1 mb-5'>
            <h1 className='dashboardTitle'>Bienvenido {userData.user.nombre}!</h1>
            
            <ProtectedElement mustBeEntrenador={true}>
                <div className='row'>
                    <div className="col-md-10">
                        <h3 className='dashboardH3'>Convocatorias</h3>
                    </div>
                    <div className="col-md-2">
                        <Button variant="primary" onClick={irAConvocatoria}>Ver</Button>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-10">
                    <h3 className='dashboardH3'>Futbolistas</h3>
                    </div>
                    <div className="col-md-2">
                        <Button variant="primary" onClick={irAJugadores}>Ver</Button>
                    </div>
                </div>
            </ProtectedElement>
            <ProtectedElement mustBePresidente={true}>
                <div className='row'>
                    <div className='container mt-3 mb-1 mb-5'>
                        <div className="col-md-12">
                            <div className='row'>
                                <Col sm={6} md={4} lg={3}>
                                    <Card bg='success'>
                                        <Card.Body>
                                            <Card.Title>Futbolistas Creados</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Activos</Card.Subtitle>
                                            <Card.Text><h3>100</h3></Card.Text>                                    
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col sm={6} md={4} lg={3}>
                                    <Card bg='danger'>
                                        <Card.Body>
                                            <Card.Title>Lesionados</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">No llegan...</Card.Subtitle>
                                            <Card.Text><h3>10</h3></Card.Text>                                    
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col sm={6} md={4} lg={3}>
                                    <Card bg='info'>
                                        <Card.Body>
                                            <Card.Title>Convocatorias</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Con 26 convocados</Card.Subtitle>
                                            <Card.Text><h3>10</h3></Card.Text>                                    
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col sm={6} md={4} lg={3}>
                                    <Card bg='info'>
                                        <Card.Body>
                                            <Card.Title>Próximo Partido</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Córdoba</Card.Subtitle>
                                            <Card.Text><h3>14/11/2023</h3></Card.Text>                                    
                                        </Card.Body>
                                    </Card>
                                </Col>
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