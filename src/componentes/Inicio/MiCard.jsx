import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Card.css'; 

export function MiCard(props) {
    const { articulo } = props;

    return (
        <div className='container d-flex justify-content-center align-items-center mt-5'>
            <Card style={{ width: '30rem' }}>
                <Card.Img variant="top" src={articulo.urlToImage} />
                <Card.Body>
                    <Card.Title>{articulo.title}</Card.Title>
                    <Card.Text>{articulo.description}</Card.Text>
                    <Button variant='primary' as='a' href={articulo.url} target='_blank'>
                        Ver Más
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
}
