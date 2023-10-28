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
import { Crud} from '../Jugadores/Jugadores';
import { Convocatoria} from '../Convocatoria/Convocatoria';
import './Header.css';
import { Login } from '../Login/Login';

export function Header() {
  return (
    <BrowserRouter>
      <>
        <Navbar collapseOnSelect expand='lg' className='custom-navbar '>
          <Container>
{/*           <a class="navbar-brand" href="/">
						<img src="/img/afa_logo_negro.png" alt="Logo AFA" style={{height: '50px', width: '40px;'}}/>
					</a> */}
            <Navbar.Brand href="/"><img src="/img/afa_logo_negro.png" alt="Logo AFA" style={{height: '60px', width: '60px'}}/></Navbar.Brand>
            <Navbar.Toggle aria-controls='algo' />
            <Navbar.Collapse id='algo'>
              <Nav className='me-auto'>

                <Nav.Link as={Link} to='/Jugadores' >Jugadores</Nav.Link>
                <Nav.Link as={Link} to='/Convocatoria' >Convocatorias</Nav.Link>
                <Nav.Link as={Link} to='/institucional' >Institucional</Nav.Link>
                <Nav.Link as={Link} to='/Contactos' >Contactos</Nav.Link>
               
              </Nav>
              <Nav.Link as={Link} to='/Login'><svg xmlns="http://www.w3.org/2000/svg" color='black' width="30" height="30" fill="currentColor" className="login-icon bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg></Nav.Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
      <div>
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/institucional' element={<Institucional />} />
          <Route path='/contactos' element={<Contactos />} />
          <Route path='/Jugadores' element={<Crud />} />
          <Route path='/Convocatoria' element={<Convocatoria />} />
          <Route path='/Login' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
