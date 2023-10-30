import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Form, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';


import './Jugadores.css' ;


export function Crud() {

    const { userData } = useContext(UserContext);
    const baseURL = 'http://localhost:3005/api/v1/';

    const navigate = useNavigate();

    // objeto para almacenar la información del formulario
    const [formulario, setFormulario] = 
    useState({dni:'',nombre:'', apellido:'', posicion:'', pieHabil:'', apodo:''});

    const opcionesPosicion = [
        { value: '', label: 'Seleccione una opción' },
        { value: '0', label: 'Arquero' },
        { value: '1', label: 'Defensor' },
        { value: '2', label: 'Mediocampista' },
        { value: '3', label: 'Delantero' },
    ];
    
    const opcionesPieHabil = [
        { value: '', label: 'Seleccione una opción' },
        { value: '0', label: 'Derecho' },
        { value: '1', label: 'Izquierdo' },
    ];

    // datos de Futbolistas
    const [datos, setDatos] = useState(null);
    
    useEffect(()=>{
        buscarFutbolistas();
    },[]);

    // Accede al token
    const token = userData.token;

    const buscarFutbolistas = async () =>{
        axios.get(baseURL + 'futbolista/futbolistas', {
            headers: {
              'Authorization': `Bearer ${token}` // Reemplaza `tuTokenJWT` con la variable que almacena el token JWT.
            }
          })
        .then (res => {
            console.log(res);
            setDatos(res.data.dato);
        
        })
        .catch(error => {
            console.log(error);
        });             
    }

    const eliminarFutbolista = async (idFutbolista) => {
        axios
            .delete(baseURL + 'futbolista/futbolistas/' + idFutbolista)
            .then((res) => {
                buscarFutbolistas();
                Swal.fire({
                    icon: 'success',
                    title: 'Futbolista eliminado',
                    text: 'El futbolista ha sido eliminado con éxito.',
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const editarFutbolista = async (idFutbolista) =>{
        axios.put(baseURL + 'futbolista/futbolistas/' + idFutbolista)
        .then( res => {
            buscarFutbolistas();
        })
        .catch( error => {
            console.log(error);
        })
    }

    const enviarInformacion = async (e) => {
        e.preventDefault();
    
        try {
            const res = await axios.post(baseURL + 'futbolista/futbolistas', formulario);
            console.log(res);
    
            if (res.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Futbolista creado',
                    text: 'El futbolista se ha creado exitosamente.',
                });
                buscarFutbolistas();
                setFormulario({
                    dni: '',
                    nombre: '',
                    apellido: '',
                    posicion: '',
                    pieHabil: '',
                    apodo: '',
                });
            }
        } catch (error) {
            console.error(error);
    
            if (error.response && error.response.status === 400 && error.response.data.msj === 'El DNI ya ha sido registrado anteriormente') {
                Swal.fire({
                    icon: 'error',
                    title: 'DNI duplicado',
                    text: 'El DNI ya ha sido registrado anteriormente. Por favor, ingresa un DNI válido.',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.',
                });
            }
        }
    };

    function confirmarEliminacion(idFutbolista) {
        Swal.fire({
            title: 'Eliminar Futbolista',
            text: '¿Está seguro de que desea eliminar este futbolista?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'eliminar',
            cancelButtonText: 'cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarFutbolista(idFutbolista);
            }
        });
    }

    const dashboard = () => {        
        navigate('/privado/dashboard');        
    };

    return (
        <>
            <div className='container mt-4 mb-2'>
            <div className='row'>
                <div className="col-md-11">
                    <h1 className='crudTitle'>Futbolistas</h1>
                </div>
                <div className="col-md-1">
                    <Button variant="info" onClick={dashboard}>Volver</Button>
                </div>
            </div>
            </div>
            <div className='container mt-4 mb-2'>
                <Card className='mt-3 mb-3'>
                    <Card.Body>
                        <Form onSubmit={e => enviarInformacion(e)}>
                            <div className='row'>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicdni">
                                        <Form.Label>DNI</Form.Label>
                                        <Form.Control type="text" autoComplete='off'
                                            onChange={(e) => setFormulario({ ...formulario, dni:e.target.value })}
                                            value={formulario.dni} required/>
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicNombre">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            type="text"
                                            autoComplete='off'
                                            onChange={(e) => {
                                                const nombre = e.target.value;
                                                const nombreCapitalizado = nombre
                                                    .split(' ')  // Dividir el nombre en palabras por si se ingresan dos nombres
                                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalizar cada nombre
                                                    .join(' ');  // Unir las palabras nuevamente
                                                setFormulario({
                                                    ...formulario,
                                                    nombre: nombreCapitalizado
                                                });
                                            }}
                                            value={formulario.nombre}
                                            required
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicApellido">
                                        <Form.Label>Apellido</Form.Label>
                                        <Form.Control
                                            type="text"
                                            autoComplete='off'
                                            onChange={(e) => {
                                                const apellido = e.target.value;
                                                const apellidoCapitalizado = apellido
                                                    .split(' ')  // Dividir el apellido en palabras
                                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalizar cada palabra
                                                    .join(' ');  // Unir las palabras nuevamente
                                                setFormulario({
                                                    ...formulario,
                                                    apellido: apellidoCapitalizado
                                                });
                                            }}
                                            value={formulario.apellido}
                                            required/>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicPosicion">
                                        <Form.Label>Posición</Form.Label>
                                        <Form.Select
                                            onChange={(e) => setFormulario({ ...formulario, posicion: e.target.value })}
                                            value={formulario.posicion}
                                            required
                                        >
                                            {opcionesPosicion.map((opcion) => (
                                                <option key={opcion.value} value={opcion.value}>
                                                    {opcion.label}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicPieHabil">
                                        <Form.Label>Pie Habil</Form.Label>
                                        <Form.Select
                                            onChange={(e) => setFormulario({ ...formulario, pieHabil: e.target.value })}
                                            value={formulario.pieHabil}
                                            required
                                        >
                                            {opcionesPieHabil.map((opcion) => (
                                                <option key={opcion.value} value={opcion.value}>
                                                    {opcion.label}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicApodo">
                                        <Form.Label>Apodo</Form.Label>
                                        <Form.Control type="text" autoComplete='off'
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
                                        <Button variant="success" className='miBoton' 
                                        onClick={()=>editarFutbolista(item.idFutbolista)}>Editar</Button>

                                        <Button
                                            variant="danger"
                                            className='miBoton'
                                            onClick={() => confirmarEliminacion(item.idFutbolista)}> Eliminar </Button>
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