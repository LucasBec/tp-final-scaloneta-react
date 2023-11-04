import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, Button  } from 'react-bootstrap';
import './Convocados.css';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext';
import Swal from 'sweetalert2';

export function Convocados(props) {
    const { idConvocatoria, rival } = useParams();
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);

    const baseURL = 'http://localhost:3005/api/v1/';

    const [convocados, setConvocados] = useState([]);
    const [titulares, setTitulares] = useState([]);
    const [capitan, setCapitan] = useState([]);
    const [dorsales, setDorsales] = useState([]);


    useEffect(()=>{
        buscarConvocados();
    },[]); 
    
    const buscarConvocados = async () => {
        axios.get(baseURL + 'futbolistaConvocatoria/futbolistaConvocatoria/' + idConvocatoria, {
            headers: {
              'Authorization': `Bearer ${userData.token}`
            }
          })
        .then( res => {     
            // tarea agregar control
            setConvocados(res.data.dato);
            // Inicializamos los dorsales con valores por defecto
            setDorsales(Array(res.data.dato.length).fill(''));
        })
        .catch(error =>{
            console.log(error);
        });
    }

    const titularizar = async (idFutbolista, dorsalValue) => {
        if (titulares.includes(idFutbolista)) {
            // Si ya está seleccionada, quitarla de la lista de seleccionadas
            setTitulares(titulares.filter((rowId) => rowId !== idFutbolista));
    
            // También debes eliminar el dorsal correspondiente
            const index = convocados.findIndex((item) => item.idFutbolista === idFutbolista);
            const nuevosDorsales = [...dorsales];
            nuevosDorsales[index] = 0; // Almacenar como un número entero
            setDorsales(nuevosDorsales);
        } else {
            if (titulares.length === 11) {
                alert('Ya hay 11 titulares seleccionados');
                return;
            } else {
                setTitulares([...titulares, idFutbolista]);
    
                // Actualiza el estado dorsal con el nuevo valor entero
                const index = convocados.findIndex((item) => item.idFutbolista === idFutbolista);
                const nuevosDorsales = [...dorsales];
                nuevosDorsales[index] = dorsalValue;
                setDorsales(nuevosDorsales);
            }
        }
    };

    const cambiarDorsal = (index, dorsalValue) => {
        const nuevosDorsales = [...dorsales];
        nuevosDorsales[index] = dorsalValue;
        if (parseInt(nuevosDorsales) > 99 || parseInt(nuevosDorsales) < 1){ //controla el numero de dorsal
            alert('dorsal no puede ser mayor que 99 o menor que 1')
            return;}
        else {setDorsales(nuevosDorsales)
            console.log(nuevosDorsales)}
      };


    const marcarCapitan = async (idFutbolista) => {
        // Verifica si el jugador ya está en la lista de titulares
        if (titulares.includes(idFutbolista)) {
            // Verifica que solo se elija 1 capitan
            if (capitan.length > 0) {
                alert('Ya hay un capitán seleccionado');
            } else {
                setCapitan([...capitan, idFutbolista]);
            }
        } else {
            alert('El jugador debe ser titular para ser capitán');
        }
    };

    const enviarEquipoTitular = () => {
        // Obtén los ID de los futbolistas titulares
        const futbolistasTitulares = titulares;
    
        // Crea un objeto que incluya los ID de los futbolistas titulares y sus dorsales
        const equipoTitular = futbolistasTitulares.map((idFutbolista) => ({
            idFutbolista,
            dorsal: dorsales[convocados.findIndex((item) => item.idFutbolista === idFutbolista)]
        }));
    
        const idCapitan = capitan[0];
    
        // Verifica si hay dorsales vacíos en el equipoTitular
        if (equipoTitular.some((jugador) => jugador.dorsal === '')) {
            alert('No puedes enviar dorsales vacíos en el equipo titular');
            return;
        }
    
        const data = { idConvocatoria, equipoTitular, idCapitan };
    
        console.log('data: ', data);
    
        // Envía los datos al servidor
        axios.put(baseURL + 'futbolistaConvocatoria/equipoTitular', data, {
            headers: {
                'Authorization': `Bearer ${userData.token}`
            }
        })
            .then(async (res) => {
                if (res.data.estado === 'OK') {
                    const result = await Swal.fire({
                        text: res.data.msj,
                        icon: 'success'
                    });
                    console.log('id conv: ', idConvocatoria);
                    console.log('Equipo Titular: ', equipoTitular);
    
                    if (result.isConfirmed) {
                        navigate('/privado/convocatoria');
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const volver = () => {
        navigate('/privado/convocatoria');
    };

    return (
        <>
            <div className='container mt-3 mb-1 mb-5'>
            <div className='row'>
                    <div className="col-md-10">
                        <h2>Convocados vs {rival}</h2>
                    </div>
                    <div className="col-md-1">
                        <Button variant="primary" onClick={enviarEquipoTitular}>Confirmar</Button>
                    </div>
                    <div className="col-md-1">
                        <Button variant="info" onClick={volver}>Volver</Button>
                    </div>
                

                </div>

                <div className='tablaContainer'>
                    <Table striped bordered hover className='miTabla'>
                        <thead >
                            <tr>
                                {/* <th className='miThead'>id</th> */}
                                <th className='miThead'>Nombre</th>
                                <th className='miThead'>Apellido</th>
                                <th className='miThead'>Posición</th>
                                <th className='miThead'>Dorsal</th>
                                <th className='miThead'>Capitán</th>
                                <th className='miThead'>Titular ({titulares.length})</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                convocados ? (convocados.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.nombre}</td>
                                        <td>{item.apellido}</td>
                                        <td>{item.posicion}</td>
                                        <td>
                                            {titulares.includes(item.idFutbolista) ? (
                                                <input
                                                    className='numberInput'
                                                    type="number"
                                                    min="1"
                                                    max="99"
                                                    value={dorsales[index]}  //corregir para que solo capte los dorsales de los titulares
                                                    onChange={(e) => cambiarDorsal(index, e.target.value)} // Actualiza el dorsal por índice

                                                    
                                                />
                                            ) : (
                                                item.dorsal
                                            )}
                                        </td>
                                        <td>
                                            <input
                                                className='checkbox'
                                                type="checkbox"
                                                checked={capitan.includes(item.idFutbolista)}
                                                onChange={() => marcarCapitan(item.idFutbolista)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                className='checkbox'
                                                type="checkbox"
                                                checked={titulares.includes(item.idFutbolista)}
                                                onChange={() => titularizar(item.idFutbolista)}
                                            />
                                        </td>
                                    </tr>
                                )))
                                : <></>
                            }
                        </tbody>
                    </Table> 
                </div>
            </div>
        </>
    );
}