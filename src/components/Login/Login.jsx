import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
  
    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Lógica de autenticación aquí
  
      console.log('Datos de inicio de sesión:', formData);
    };
  
    return (
      <div className="container mt-5">
        <h2>Iniciar Sesión</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su nombre de usuario"
              name="username"  {/* Corregido el nombre del campo */}
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              name="password"  {/* Corregido el nombre del campo */}
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
  
          <Button variant="primary" type="submit">
            Iniciar Sesión
          </Button>
        </Form>
      </div>
    );
  };
  
export default Login;
  