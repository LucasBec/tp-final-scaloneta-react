import { useState, useEffect } from 'react';

import axios from 'axios';

import { Button, Table, Form, Card } from 'react-bootstrap';

import './Jugadores.css' ;


export function Crud() {
    const baseURL = 'http://localhost:3005/api/v1/';

    // objeto para almacenar la información del formulario
    const [formulario, setFormulario] = 
    useState({dni:'',nombre:'', apellido:'', posicion:'', pieHabil:'', apodo:''});

    // datos de Futbolistas
    const [datos, setDatos] = useState(null);
    
    useEffect(()=>{
        buscarFutbolistas();
    },[]); 

    const buscarFutbolistas = async () =>{
        axios.get(baseURL + 'futbolista/futbolistas')
        .then (res => {
            console.log(res);
            setDatos(res.data.dato);
        
        })
        .catch(error => {
            console.log(error);
        });             
    }

    const eliminarfutbolista = async (idFutbolista) =>{
        axios.delete(baseURL + 'futbolista/futbolistas/' + idFutbolista)
        .then( res => {
            buscarFutbolistas();
        })
        .catch( error => {
            console.log(error);
        })
    }

    const editarfutbolista = async (idFutbolista) =>{
        axios.put(baseURL + 'futbolista/futbolistas/' + idFutbolista)
        .then( res => {
            buscarFutbolistas();
        })
        .catch( error => {
            console.log(error);
        })
    }

    const enviarInformacion = async(e)=>{
        e.preventDefault();

        axios.post(baseURL + 'futbolista/futbolistas', formulario )
        .then( res => {
            console.log(res);
            /* if(res.data.estado === 'OK'){
                alert(res.data.msj);
                buscarFutbolistas();
                setFormulario({dni:'',nombre:'', apellido:'', posicion:'', pieHabil:'', apodo:''});
            }  */


            if(res.status === 201){
                alert(res.data.msj);
                buscarFutbolistas();
                setFormulario({dni:'',nombre:'', apellido:'', posicion:'', pieHabil:'', apodo:''});
            }
        })
        .catch(error => {
            console.log(error)

        })
    }

    return (
        <>
            <div className='container mt-4 mb-2'>
                <Card className='mt-3 mb-3'>
                    <Card.Body>
                        <Form onSubmit={e => enviarInformacion(e)}>
                            <div className='row'>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicdni">
                                        <Form.Label>DNI</Form.Label>
                                        <Form.Control type="text"
                                            onChange={(e) => setFormulario({ ...formulario, dni:e.target.value })}
                                            value={formulario.dni} required/>
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicNombre">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="text"
                                            onChange={(e) => setFormulario({ ...formulario, nombre:e.target.value })}
                                            value={formulario.nombre} required/>
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicApellido">
                                        <Form.Label>Apellido</Form.Label>
                                        <Form.Control type="text"
                                            onChange={(e) => setFormulario({ ...formulario, apellido:e.target.value })}
                                            value={formulario.apellido} required/>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicPosicion">
                                        <Form.Label>Posición</Form.Label>
                                        <Form.Select onChange={(e) => setFormulario({ ...formulario, posicion:e.target.value })} required>
                                            <option value="">Seleccione una opción</option>
                                            <option value="0">Arquero</option>
                                            <option value="1">Defensor</option>
                                            <option value="2">Mediocampista</option>
                                            <option value="3">Delantero</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicPieHabil">
                                        <Form.Label>Pie Habil</Form.Label>
                                        <Form.Select onChange={(e) => setFormulario({ ...formulario, pieHabil:e.target.value })} required>
                                            <option value="">Seleccione una opción</option>
                                            <option value="0">Derecho</option>
                                            <option value="1">Izquierdo</option>
                                        </Form.Select>
                                    </Form.Group>
                                    
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicApodo">
                                        <Form.Label>Apodo</Form.Label>
                                        <Form.Control type="text"
                                            onChange={(e) => setFormulario({ ...formulario, apodo:e.target.value })}
                                            value={formulario.apodo}/>
                                    </Form.Group>
                                    
                                </div>
                            </div>

                            <Button variant="primary" type="submit">
                                Crear
                            </Button>
                        </Form>  
                    </Card.Body>
                </Card>
            </div>

            <div className='container mt-5 mb-5 miTabla'>
                <Table striped bordered hover >
                    <thead >
                        <tr>
                            <th className='miThead'>ID</th>
                            <th className='miThead'>DNI</th>
                            <th className='miThead'>Apellido</th>
                            <th className='miThead'>Nombre</th>
                            <th className='miThead'>Posicion</th>
                            <th className='miThead'>Pie Habil</th>
                            <th className='miThead'>Apodo</th>
                            <th className='miThead'>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            datos ? (datos.map((item, index) => (
                                <tr key={index}> 
                                    <td>{item.idFutbolista}</td>
                                    <td>{item.dni}</td>
                                    <td>{item.apellido}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.posicion}</td>
                                    <td>{item.pieHabil}</td>
                                    <td>{item.apodo}</td>
                                    <td>
                                        <Button variant="success" className='miBoton' onClick={()=>editarfutbolista(item.idFutbolista)}>Editar</Button>
                                        <Button variant="danger" className='miBoton' onClick={()=>eliminarfutbolista(item.idFutbolista)}>Eliminar</Button>
                                    </td>
                                </tr>
                            ))) 
                            : 
                            (
                                <tr>
                                    {/* TAREA: un mensaje o similar  */}
                                </tr>
                            )
                        }
                    </tbody>
                </Table> 
            </div>
        </>
    );
}