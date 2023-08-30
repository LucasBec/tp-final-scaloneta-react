import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import './Card.css';

export function MiCard(props) {
  const { articulo, index } = props;
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-100px',
  });

  // Determinar la dirección de entrada (izquierda o derecha) basado en el índice
  const fromDirection = index % 2 === 0 ? -100 : 100;

  // Definir la animación con el uso de react-spring
  const animationProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0)' : `translateX(${fromDirection}px)`,
    from: { opacity: 0, transform: `translateX(${fromDirection}px)` },
    delay: inView ? 0 : index * 200,
  });

  return (
    <div className='card-container d-flex justify-content-center align-items-center mt-5' ref={ref}>
      <animated.div style={animationProps}>
        <Card style={{ width: '30rem' }}>
          <Card.Img variant="top" src={articulo.urlToImage} />
          <Card.Body>
            <Card.Title>{articulo.title}</Card.Title>
            <Card.Text>{articulo.description}</Card.Text>
            <Button className="ver-mas-button" variant="primary" as="a" href={articulo.url} target="_blank">
            Ver Más
            </Button>
          </Card.Body>
        </Card>
      </animated.div>
    </div>
  );
}
