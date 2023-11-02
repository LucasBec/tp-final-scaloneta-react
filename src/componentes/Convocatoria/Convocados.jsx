import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, Button  } from 'react-bootstrap';
import './Convocados.css';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext';
import Swal from 'sweetalert2';

export function Convocados(props) {
    const { idConvocatoria, rival } = useParams();

    const { userData } = useContext(UserContext);

    const baseURL = 'http://localhost:3005/api/v1/';

        // obtengo mi parametro id convocatoria

    const [convocados, setConvocados] = useState([]);
    const [titulares, setTitulares] = useState([]);
    const [capitan, setCapitan] = useState([]);

    const navigate = useNavigate();

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
        })
        .catch(error =>{
            console.log(error);
        });
    }

    const titularizar = async (idFutbolista) => {
        if (titulares.includes(idFutbolista)) {
            // Si ya está seleccionada, quitarla de la lista de seleccionadas
            setTitulares(titulares.filter((rowId) => rowId !== idFutbolista));
        } else {
            if(titulares.length === 11){
                alert('ya hay 11 titulares seleccionados')
                return;
            }else{
                setTitulares([...titulares, idFutbolista])
            }
        } 
    }

    const marcarCapitan = async (idFutbolista) => {
        // Verificar si ya hay un capitán en la lista de titulares
        if (capitan.includes(idFutbolista)) {
            // Si ya está seleccionada, quitarla de la lista de seleccionadas
            setCapitan(capitan.filter((rowId) => rowId !== idFutbolista));
        }else {
            if(capitan.length === 1){
                alert('ya hay un capitan seleccionado')
                return;
            }else{
                setCapitan([...capitan, idFutbolista])
            }
        } 
    }

    const enviarEquipoTitular = () => {    
        
        const lista ={ idConvocatoria:idConvocatoria, futbolistas:titulares, capitan:capitan}  
        axios.post(baseURL + 'futbolistaConvocatoria/equipoTitular', lista , { headers: {
            'Authorization': `Bearer ${userData.token}`
        }})
        .then( async res => {           
            if (res.data.estado === 'OK') {
                const result = await Swal.fire({
                    text: res.data.msj,
                    icon:'success'})

                if (result.isConfirmed){
                    navigate('/privado/convocatoria');
                }    
            }
        })
        .catch(error =>{
            console.log(error);
        });

    }

    const volver = () => {
        navigate('/privado/convocatoria');
    }

    return (
        <>
            <div className='container mt-3 mb-1 mb-5'>
                <div className='row'>
                    <div className="col-md-10">
                        <h2>Convocados vs {rival}</h2>
                    </div>
                    <div className="col-md-2">
                        <Button variant="primary" onClick={volver}>Volver</Button>
                    </div>
                </div>

                <div className='miTabla'>
                    <Table striped bordered hover>
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
                                        <td>{item.dorsal}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={capitan.includes(item.idFutbolista)}
                                                onChange={() => marcarCapitan(item.idFutbolista)}
                                            />
                                        </td>
                                        <td>
                                            <input
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