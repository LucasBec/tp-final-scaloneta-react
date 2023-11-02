import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export function ModalEdicion({ jugadorSeleccionado, onHide, onSave }) {

    const [formularioEdicion, setFormularioEdicion] = useState({
        dni: jugadorSeleccionado?.dni || "",
        nombre: jugadorSeleccionado?.nombre || "",
        apellido: jugadorSeleccionado?.apellido || "",
        posicion: jugadorSeleccionado?.posicion || "",
        pieHabil: jugadorSeleccionado?.pieHabil || "",
        apodo: jugadorSeleccionado?.apodo || "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormularioEdicion({
            ...formularioEdicion,
            [name]: value,
        });
    };

    const handleSave = () => {
        // Llama a la función onSave y pasa el formulario editado
        onSave(formularioEdicion);
    };

    return (
        <Modal show={jugadorSeleccionado !== null} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Futbolista</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={formularioEdicion.nombre}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicApellido">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            name="apellido"
                            value={formularioEdicion.apellido}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPosicion">
                        <Form.Label>Posición</Form.Label>
                        <Form.Control
                            as="select"
                            name="posicion"
                            value={formularioEdicion.posicion}
                            onChange={handleInputChange}
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="0">Arquero</option>
                            <option value="1">Defensor</option>
                            <option value="2">Mediocampista</option>
                            <option value="3">Delantero</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formBasicPieHabil">
                        <Form.Label>Pie Hábil</Form.Label>
                        <Form.Control
                            as="select"
                            name="pieHabil"
                            value={formularioEdicion.pieHabil}
                            onChange={handleInputChange}
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="0">Derecho</option>
                            <option value="1">Izquierdo</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formBasicApodo">
                        <Form.Label>Apodo</Form.Label>
                        <Form.Control
                            type="text"
                            name="apodo"
                            value={formularioEdicion.apodo}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}