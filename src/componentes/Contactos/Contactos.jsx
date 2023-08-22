import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export function Contactos (){
    return (
    <>

        <h1>Contactos</h1>

        <Form>
          <fieldset enabled>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledTextInput">Nombre Y Apellido</Form.Label>
              <Form.Control id="disabledTextInput" type='text' placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledTextInput">Correo Electronico</Form.Label>
              <Form.Control id="disabledTextInput" type='email' placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledTextInput">Mensaje</Form.Label>
              <Form.Control id="disabledTextInput" type='textarea' placeholder="..." />
            </Form.Group>

            <Button type="submit">Enviar</Button>
          </fieldset>
        </Form>
        </>
      );
      
}