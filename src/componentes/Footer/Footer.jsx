import React from 'react';
import './Footer.css';
import { Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
export function Footer() {
  return (
    <footer className="footer-container absolute-bottom">
      <Container fluid className="d-flex justify-content-between align-items-center">
        <Col md={4} className="d-flex align-items-center">
          <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
            <svg className="bi" width="30" height="24">
              <use xlinkHref="#bootstrap" />
            </svg>
          </a>
          <span className="mb-3 mb-md-0 text-body-secondary">&copy; 2023 AFA</span>
        </Col>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex social-icons">
          <li className="ms-3">
            <a href="https://twitter.com" className="text-body-secondary">
              <i className="bi bi-twitter"></i>
            </a>
          </li>
          <li className="ms-3">
            <a href="https://instagram.com" className="text-body-secondary">
              <i className="bi bi-instagram"></i>
            </a>
          </li>
          <li className="ms-3">
            <a href="https://facebook.com" className="text-body-secondary">
              <i className="bi bi-facebook"></i>
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
