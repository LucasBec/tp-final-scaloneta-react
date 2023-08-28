/* imports bootstrap */
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

/* router */
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'

/* componentes */
import { Contactos } from '../Contactos/Contactos';
import { Institucional } from '../Institucional/Institucional';
import { Inicio} from '../Inicio/Inicio';
import './Header.css';

export function Header() {
  return (
    <BrowserRouter>
      <>
        <Navbar collapseOnSelect expand='lg' className='custom-navbar '>
          <Container>
           
            <Navbar.Toggle aria-controls='algo' />
            <Navbar.Collapse id='algo'>
              <Nav className='me-auto'>
                <Navbar.Brand href="/">Inicio</Navbar.Brand>
                <Nav.Link as={Link} to='/institucional'>Institucional</Nav.Link>
                <Nav.Link as={Link} to='/contactos'>Contactos</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
      <div>
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/institucional' element={<Institucional />} />
          <Route path='/contactos' element={<Contactos />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
