//hook de react
import { useState } from "react";

//clases bootstrap
import { Form, Button, Card, Table} from "react-bootstrap" ;

export function Contactos (){

    // objeto para almacenar la información del formulario
    const [formulario, setFormulario] = useState({nombre:'', correo:'', mensaje:''});

    function enviarInformacion(){
        alert(JSON.stringify(formulario));
    }

    return(
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <Card>
                        <Card.Body>
                            <Card.Title>Envianos tu consulta</Card.Title>
                            
                            <Form onSubmit={enviarInformacion}>
                                <Form.Group className="mb-3" controlId="formBasicNombre">
                                    <Form.Label>Nombre y Apellido</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setFormulario({ ...formulario, nombre:e.target.value })}/>

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCorreo">
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control type="email" onChange={(e) => setFormulario({ ...formulario, correo: e.target.value})}/>
                                    <Form.Text className="text-muted">
                                        No compartiremos tu correo con nadie.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicMensaje">
                                    <Form.Label>Mensaje</Form.Label>
                                    <Form.Control as="textarea" rows={5} onChange={(e) => setFormulario({ ...formulario, mensaje: e.target.value})}/>
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
                            <Table striped bordered hover>
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