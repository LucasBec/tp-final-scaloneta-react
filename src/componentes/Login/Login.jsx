import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './Login.css';

export function Login() {
    const baseURL = 'http://localhost:3005/api/v1/';
    const navigate = useNavigate();
    const [formulario, setFormulario] = useState({ correoElectronico: '', clave: '' });
    const { userData, setUserData } = useContext(UserContext);

    // Intentar recuperar datos del usuario del localStorage al cargar la aplicación
    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, [setUserData]);

    const enviarInformacion = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(baseURL + 'auth/login', formulario);

            if (response.status === 200) {
                const { usuario, token } = response.data;

                // Setear el contexto del usuario
                setUserData({ user: usuario, token: token });

                // Guardar el userData en el localStorage
                localStorage.setItem('userData', JSON.stringify({ user: usuario, token: token }));

                navigate('/privado/dashboard');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <>
            <div className="login-container">
                <div className="login-form">
                    <Form onSubmit={(e) => enviarInformacion(e)}>
                        <div className='row'>
                            <div className="col-md-12">
                                <Form.Group className="mb-3" controlId="formBasicUsuario">
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={(e) => setFormulario({ ...formulario, correoElectronico: e.target.value })}
                                        value={formulario.correoElectronico}
                                        required
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-md-12">
                                <Form.Group className="mb-3" controlId="formBasicClave">
                                    <Form.Label>Clave</Form.Label>
                                    <Form.Control
                                        type="password"
                                        onChange={(e) => setFormulario({ ...formulario, clave: e.target.value })}
                                        value={formulario.clave}
                                        required
                                    />
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
