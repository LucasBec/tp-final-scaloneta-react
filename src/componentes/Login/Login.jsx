// propio de reactj
import { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './Login.css';

export function Login() {
    const baseURL = 'http://localhost:3005/api/v1/';
    const navigate = useNavigate();
    const [formulario, setFormulario] = useState({correoElectronico:'',clave:''});
    
    const {setUserData} = useContext(UserContext);
    

    const enviarInformacion = async(e)=>{
        e.preventDefault();

        axios.post(baseURL + 'auth/login', formulario)
        .then( res => {
            if(res.status === 200){    
                console.log(res.data);            
                
                // con los datos del usuario seteo el contexto del usuario, 
                // también seteo el token para utilizarlo en las consultas al back
                setUserData({ user: res.data.usuario, token: res.data.token });
                navigate('/privado/dashboard');
            }
            // tarea, qué pasa si no se loguea correctemente?!
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <>
            <div className="login-container">
                <div className="login-form">
                    <Form onSubmit={e => enviarInformacion(e)}>
                        <div className='row'>
                            <div className="col-md-12">
                                <Form.Group className="mb-3" controlId="formBasicUsuario">
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(e) => setFormulario({ ...formulario, correoElectronico:e.target.value })}
                                        value={formulario.correoElectronico} required/>
                                </Form.Group>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-md-12">
                                <Form.Group className="mb-3" controlId="formBasicClave">
                                    <Form.Label>Clave</Form.Label>
                                    <Form.Control type="password"
                                        onChange={(e) => setFormulario({ ...formulario, clave:e.target.value })}
                                        value={formulario.clave} required/>
                                </Form.Group>
                            </div>
                        </div>

                        <Button variant="primary" type="submit">
                            Iniciar sesión
                        </Button>
                    </Form>  
                </div>
            </div>
        </>
    );
}