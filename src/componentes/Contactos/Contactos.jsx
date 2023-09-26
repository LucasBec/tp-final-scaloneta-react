//hook de react
import { useState } from "react";
import axios from "axios";

//clases bootstrap
import { Form, Button, Card, Table} from "react-bootstrap" ;

import "./Contactos.css"

export function Contactos (){
    const baseURL = 'http://localhost:3005/api/v1/publico/contacto';

    // objeto para almacenar la información del formulario
    const [formulario, setFormulario] = useState({nombre:'', correo:'', mensaje:''});

    
    // function enviarInformacion(){
    //     alert(JSON.stringify(formulario));
    // }   

    const enviarInformacion = async(e)=>{
        e.preventDefault();

		// argumentos: direccion del servidor, datos enviados al servidor
        axios.post(baseURL,formulario)
        .then( res => {
            console.log(res);
            alert(res.data.respuesta);
            setFormulario({nombre:'', correo:'', mensaje:''});
        })
        .catch( error=> {
            console.log('error ', error);
        });

    }

    return(
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                    <Card>
                        <Card.Body>
                            <Card.Title>Envianos tu consulta</Card.Title>
                            
                            <Form onSubmit={e => enviarInformacion(e)}>
                                <Form.Group className="mb-3" controlId="formBasicNombre">
                                    <Form.Label>Nombre y Apellido</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setFormulario({ ...formulario, nombre:e.target.value })}
                                        value={formulario.nombre} required/>

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCorreo">
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control type="email" onChange={(e) => setFormulario({ ...formulario, correo: e.target.value})}
                                        value={formulario.correo} required/>
                                    <Form.Text className="text-muted">
                                        No compartiremos tu correo.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicMensaje">
                                    <Form.Label>Mensaje</Form.Label>
                                    <Form.Control as="textarea" rows={5} onChange={(e) => setFormulario({ ...formulario, mensaje: e.target.value})}
                                        value={formulario.mensaje} required/>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Enviar
                                </Button>
                            </Form>  
                        </Card.Body>
                        </Card>
                    </div>

                    <div className="col-md-6">
                    <Card>
                        <Card.Body>
                            <Card.Title>Información Útil</Card.Title>
                            <Table id="infoTable" striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>Departamento</th>
                                    <th>Teléfono</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Sede Social</td>
                                        <td>+54 11 4370-7900</td>
                                    </tr>
                                    <tr>
                                        <td>Predio Lionel Andrés Messi</td>
                                        <td>+54 4480-9393</td>
                                    </tr>
                                    <tr>
                                        <td>Dep. Selecciones Nacionales</td>
                                        <td>4480-0408/9901/9619</td>
                                    </tr>
                                </tbody>
                                </Table>

                                <p>
                                Sede Social: Viamonte 1366, (C1053ACB)
                                Ciudad Autónoma de Buenos Aires | <br />
                                Predio de Ezeiza: Autopista Ricchieri y
                                Enrique Fernández Garcia, (1802), Ezeiza, Provincia de Buenos Aires
                                </p>
                        </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
            
        </>
    )
}