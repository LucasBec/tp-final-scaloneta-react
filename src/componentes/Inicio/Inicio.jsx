//hook de react
import { useEffect, useState } from "react";
// componente personalizado
import { MiCard } from "./MiCard";
// clase de bootstrap
import { Alert } from "react-bootstrap";

import { Row, Col, Container } from "react-bootstrap"; // Solo importa los componentes que vas a usar

import "./Inicio.css"; // Importa tu archivo de estilos CSS personalizados si lo tienes

export function Inicio() {

  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const tema = 'soccer messi';
    const apiKey = 'e08e9237c92a4a749bc489771a818b6d';
    const consulta = `https://newsapi.org/v2/everything?q=${tema}&sortBy=publishedAt&pageSize=5&language=es&apiKey=${apiKey}`;

    fetch(consulta)
      .then(resp => {
        resp.json().then(data => {
          setDatos(data.articles);
        });
      })
      .catch(error => {
        console.log('error -->', error);
      });
  }, []);

  return (
    <>
      <div className="parallax-container">
        <img
          src="img/imagen-home1.jpg"
          alt="Portada"
          className="parallax-image"
        />
      </div>
      

      <Container className="p-index-html">
        <Row>
          <Col>
            <p>
                ¡Bienvenidos a la nueva aplicación de la AFA! En este espacio podrás encontrar todo lo relacionado con la Selección Argentina de fútbol y su cuerpo técnico.
                Te invitamos a conocer nuestra nueva aplicación Web, desarrollada en colaboración con expertos en tecnología. Esta herramienta única en su tipo permitirá al cuerpo técnico de la Selección Argentina llevar a cabo de manera eficiente la convocatoria de jugadores y la creación del 11 inicial para cada partido.
                Además, en nuestro sitio encontrarás toda la información actualizada sobre los jugadores, los próximos partidos y el desempeño de la Selección en cada torneo. También podrás acceder a las últimas noticias y novedades del mundo del fútbol argentino.
                ¡Únete a nuestra comunidad y no te pierdas ningún detalle de la Selección Argentina!
            </p>
          </Col>
        </Row>
      </Container>

      <h2 className="h2-noticias">Últimas Noticias</h2>

      <div>
        {datos ? (
          datos.map((item, index) => (
            <div key={index}>
              <MiCard articulo={item} />
            </div>
          ))
        ) : (
          <Container className="mt-5">
            <Alert>Buscando información...</Alert>
          </Container>
        )}
      </div>
    </>
  );
}
