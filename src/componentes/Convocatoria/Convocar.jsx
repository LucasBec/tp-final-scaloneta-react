import { UserContext } from '../UserContext/UserContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, Table  } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Convocar.css';

export function Convocar(props) {
    const { userData } = useContext(UserContext);

    // obtengo mi parametro id convocatoria
    const { parametro, fechaParam } = useParams();

    const baseURL = 'http://localhost:3005/api/v1/';

    const [futbolistas, setFutbolistas] = useState([]);
    
    const [convocados, setConvocados] = useState([]);

    const navigate = useNavigate();

    // buscamos los jugadores activos
    useEffect(()=>{
        buscarFubolistas();
    },[]); 
    
    const buscarFubolistas = async () => {
        axios.get(baseURL + 'futbolista/futbolistas', {
            headers:{
                Authorization:`Bearer ${userData.token}`
            }
        })
        .then( res => {
            console.log(res.data.dato); 
            setFutbolistas(res.data.dato);
        })
        .catch(error =>{
            console.log(error);
        });
    }

    // Controla que no se convoquen más de 26 futbolistas
    const convocar = (idFutbolista) => {
        if (convocados.includes(idFutbolista)) {
            // Si ya está seleccionado, quito de la lista de convocados
            setConvocados(convocados.filter((rowId) => rowId !== idFutbolista));
        } else {
            if (convocados.length >= 26) {
                alert('No puedes convocar a más de 26 futbolistas.');
            } else {
                setConvocados([...convocados, idFutbolista]);
            }
        }
    }

    const enviarInformacion = () => {
    // Controla si no se han seleccionado futbolistas antes de enviar la información
        if (convocados.length < 11) {
            alert('Debes convocar al menos 11 futbolistas.');
            return;
        }

        const lista = {
            idConvocatoria: parametro,
            futbolistas: convocados,
            fecha: fechaParam
        };

        axios.post(baseURL + 'futbolistaConvocatoria/nueva', lista, {
            headers: {
                'Authorization': `Bearer ${userData.token}`
            }
        })
            .then(async res => {
                if (res.data.estado === 'OK') {
                    const result = await Swal.fire({
                        text: res.data.msj,
                        icon: 'success'
                    });

                    console.log('lista y fecha:', lista)

                    if (result.isConfirmed) {
                        navigate('/privado/convocatoria');
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    const convocatoria = () => {        
        navigate('/privado/convocatoria');        
    };

    return (
        <>
            <div className='container mt-3 mb-1 mb-5'>
                <div className='row'>
                    <div className="col-md-10">
                        <h1>Convocar Futbolistas</h1>
                        <h3>{fechaParam}</h3>
                    </div>
                    <div className="col-md-1">
                        <Button variant="primary" onClick={enviarInformacion}>Convocar</Button>
                    </div>
                    <div className="col-md-1">
                        <Button variant="info" onClick={convocatoria}>Volver</Button>
                    </div>

                </div>

                <div className='tablaContainer'>
                    <Table striped bordered hover className='miTabla'>
                        <thead >
                            <tr>
                                <th className='miThead'>Nombre</th>
                                <th className='miThead'>Apellido</th>
                                <th className='miThead'>Pie Habil</th>
                                <th className='miThead'>Posición</th>
                                <th className='miThead'>Convocar ({convocados.length})</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                futbolistas ? (futbolistas.map((item, index) => (
                                    <tr key={index}> 
                                        <td>{item.nombre}</td>
                                        <td>{item.apellido}</td>
                                        <td>{item.pieHabil}</td>
                                        <td>{item.posicion}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={convocados.includes(item.idFutbolista)}
                                                onChange={() => convocar(item.idFutbolista)}
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