import React, { useState } from "react";
import "./Convocatorias.css";
import { Button, Table} from 'react-bootstrap';

export function Convocatorias() {
  const [formData, setFormData] = useState({
    fecha: "",
    rival: "",
    horario: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el envío del primer formulario
    console.log("Formulario enviado:", formData);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el envío del segundo formulario
    console.log("Filtro enviado:", formData);
  };

  return (
    <>
      <div className="container">
        <div id="caja-convocatoria">
          <form onSubmit={handleSubmit}>
          <h2>Convocatorias</h2>

          <div className="form-input">
              <label htmlFor="fecha">Fecha del partido:</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-input">
              <label htmlFor="rival">Equipo Rival:</label>
              {/* Cambiado a un select */}
              <select
                id="rival"
                name="rival"
                value={formData.rival}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar equipo</option>
                <option value="equipo1">Equipo 1</option>
                <option value="equipo2">Equipo 2</option>
  
              </select>
            </div>

            <div className="form-input">
              <label htmlFor="horario">Horario del partido:</label>
              <input
                type="text"
                id="horario"
                name="horario"
                placeholder="XX:XX"
                maxLength="5"
                minLength="4"
                autoComplete="off"
                value={formData.horario}
                onChange={handleInputChange}
                required
                pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
              />
            </div>

            <div className="form-boton">
              <button type="submit" id="guardar-convocatoria-btn">
                Guardar convocatoria
              </button>
            </div>
          </form>
        </div>

        {/* Segundo formulario para filtrar por fechas */}
        <div className="container-filtro-fechas">
          <form onSubmit={handleFilterSubmit} id="filtro-convocatorias">
            <label htmlFor="fecha-inicio">Desde:</label>
            <input
              type="date"
              id="fecha-inicio"
              name="fechaInicio"
              value={formData.fechaInicio}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="fecha-fin">Hasta:</label>
            <input
              type="date"
              id="fecha-fin"
              name="fechaFin"
              value={formData.fechaFin}
              onChange={handleInputChange}
            />

            <button type="submit">Filtrar</button>
          </form>
        </div>
         {/* Tabla de convocatorias */}
         <div className='container mt-5 mb-5 miTabla'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className='miThead'>ID</th>
                <th className='miThead'>Fecha</th>
                <th className='miThead'>Hora</th>
                <th className='miThead'>Rival</th>
                <th className='miThead'>Capitán</th>
                <th className='miThead'>Acciones</th>
              </tr>
            </thead>
            {/* <tbody>
              {convocatoriasData.map((convocatoria) => (
                <tr key={convocatoria.id}>
                  <td>{convocatoria.id}</td>
                  <td>{convocatoria.fecha}</td>
                  <td>{convocatoria.horario}</td>
                  <td>{convocatoria.rival}</td>
                  <td>{convocatoria.capitan}</td>
                  <td>
                    <Button>Editar</Button>
                    <Button>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody> */}
          </Table>
        </div>
      </div>
    </>
  );
}

       
