import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import './Convocatoria.css';
import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';
import Swal from 'sweetalert2';


export function Convocatoria() {
    const baseURL = 'http://localhost:3005';

    const { userData } = useContext(UserContext);
    // Accede al token
    const token = userData.token;

    // para poder navergar entre rutas
    const navigate = useNavigate();

    // datos de convocatoria
    const [convocatorias, setConvocatorias] = useState(null);

    // datos de los rivales disponibles
    const [rivales, setRivales] = useState(null);

    const [showModal, setShowModal] = useState(false);

    // objeto para almacenar la informacion de la convocatoria
    const [convocatoria, setConvocatoria] = useState({fecha:'',rival:'', golesRecibidos:'', golesConvertidos:''});
    
    
    
    useEffect(()=>{
        buscarConvocatorias();
    },[]);
    
    const cerrarModal = () => setShowModal(false);

    // activa el modal y busca los rivales
    const verModal = () => {
        buscarRivales();
        setShowModal(true);
    };

    // me quedo solo con la fecha del datetime
    function formatoFecha(dateTime) {
        const fecha = new Date(dateTime);
        return fecha.toISOString().split('T')[0];
    }

    const buscarRivales = async () =>{
        axios.get(baseURL + '/api/v1/rival/rivales', {
            headers: {
            'Authorization': `Bearer ${token}`
            }
          })
            .then( resp => {
                setRivales(resp.data.dato);
            })
            .catch( error => {
                console.log(error);
        });
    }

    const buscarConvocatorias = async () =>{
        axios.get(baseURL + '/api/v1/convocatoria/convocatorias', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then( resp => {
                setConvocatorias(resp.data.dato);
            })
            .catch( error => {
                console.log(error);
        })
    }

    const convocar = (id, fechaParam) => {
        navigate(`/privado/convocar/${id}/${fechaParam}`);
    };

    const dashboard = () => {
        navigate('/privado/dashboard');
    };

    const convocados = (idConvocatoria, rival) => {
        navigate(`/privado/convocados/${idConvocatoria}/${rival}`);        
    };

    const resultado = (idConvocatoria, rival) => {
        navigate(`/privado/resultado/${idConvocatoria}/${rival}`);
    };
    
    const crearConvocatoria = async(e)=>{
        e.preventDefault();

        axios.post(baseURL + '/api/v1/convocatoria/nueva', convocatoria, { headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res=> {
            if(res.data.estado==='OK'){
                Swal.fire({
                    icon: 'success',
                    title: 'Convocatoria creada',
                    text: 'La convocatoria se ha creado exitosamente.',
                  });
                console.log(res.data.msj);
                cerrarModal();
                buscarConvocatorias();
            }
        })
        .catch(error=> {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text:
                    'Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.',
                });
            console.log(error);
        })

    }



    return (
        <>
            <div className='container mt-3 mb-1 mb-5'>
                <div className='row'>
                    <div className="col-md-10">
                        <h1>Convocatorias</h1>
                    </div>
                    <div className="col-md-1">
                        <Button variant="primary" onClick={verModal}>Nueva</Button>
                    </div>
                    <div className="col-md-1">
                        <Button variant="info" onClick={dashboard}>Volver</Button>
                    </div>
                </div>
                
                
                <div className='miTabla'>
                    <Table striped bordered hover>
                        <thead >
                            <tr>
                                <th className='miThead'>Fecha</th>
                                <th className='miThead'>Rival</th>
                                <th className='miThead'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                convocatorias ? (convocatorias.map((item, index) => (
                                    <tr key={item.idConvocatoria}> 
                                        <td>{formatoFecha(item.fecha)}</td>
                                        <td>{item.nombre}</td>
                                        <td>
                                        <Button variant="secondary" className='miBoton' onClick={() => convocar(item.idConvocatoria, formatoFecha(item.fecha))}>Convocar</Button>
                                            <Button variant="success" className='miBoton' onClick={() => convocados(item.idConvocatoria, item.nombre)}>Convocados</Button>
                                            <Button variant="info" className='miBoton' onClick={() => resultado(item.idConvocatoria)}>Resultado</Button>                                            
                                        </td>
                                    </tr>
                                ))) 
                                : <></>
                            }
                        </tbody>
                    </Table> 
                </div>
            </div>

{/*             <div className="container">
                <div id="caja-convocatoria">
                    <form onSubmit={handleSubmit}>
                        <h2>Convocatorias</h2>

                        <div className="form-input">
                            <label htmlFor="fecha">Fecha del partido:</label>
                            <input
                                type="date"
                                id="fecha"
                                name="fecha"
                                value={formData.fecha}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-input">
                            <label htmlFor="rival">Equipo Rival:</label>
                            <select
                                id="rival"
                                name="rival"
                                value={formData.rival}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Seleccionar equipo</option>
                                <option value="equipo1">Equipo 1</option>
                                <option value="equipo2">Equipo 2</option>

                            </select>
                        </div>

                        <div className="form-input">
                            <label htmlFor="horario">Horario del partido:</label>
                            <input
                                type="text"
                                id="horario"
                                name="horario"
                                placeholder="XX:XX"
                                maxLength="5"
                                minLength="4"
                                autoComplete="off"
                                value={formData.horario}
                                onChange={handleInputChange}
                                required
                                pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                            />
                        </div>

                        <div className="form-boton">
                            <button type="submit" id="guardar-convocatoria-btn">
                                Guardar convocatoria
                            </button>
                        </div>
                    </form>
                        </div> */}

            <Modal show={showModal} onHide={cerrarModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva Convocatoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={e => crearConvocatoria(e)}>
                        <div className='row'>
                            <div className="col-md-4">
                                <Form.Group className="mb-3" controlId="formBasicFecha">
                                    <Form.Label>Fecha</Form.Label>
                                    <Form.Control type="date"
                                        onChange={(e) => setConvocatoria({ ...convocatoria, fecha:e.target.value })}
                                        value={convocatoria.fecha} required/>
                                </Form.Group>
                            </div>
                            
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicRival">
                                    <Form.Label>Rival</Form.Label>
                                    <Form.Select onChange={(e) => setConvocatoria({ ...convocatoria, rival:e.target.value })}>
                                        <option value="">Seleccione una opción</option>
                                        { (rivales?.length > 0) ? rivales.map(item => (
                                            <option key={item.idRival} value={item.idRival}>
                                                {item.nombre}
                                            </option>
                                        )) : <></>}                                        
                                    </Form.Select>                                    
                                </Form.Group>
                            </div>
                        </div>
                        <Button variant="primary" type="submit">Guardar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
