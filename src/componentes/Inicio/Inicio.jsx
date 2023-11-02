import React, { useEffect, useState } from "react";
import { MiCard } from "./MiCard";
import { Alert, Container, Row, Col } from "react-bootstrap";
import "./Inicio.css";
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';


//  rutas completas de las imágenes en la carpeta actual
const imagenHome1 = require('./img carousel/imagen-home1.jpg');
const argentinaCampeon = require('./img carousel/argentina-campeon-mundial-2022.jpg');
const argentinaLevantandoLaCopa = require('./img carousel/argentina levantando la copa.jpg');
const tapia = require('./img carousel/tapia-1.jpg');


const items = [
  {
    src: imagenHome1,
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: argentinaCampeon,
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: argentinaLevantandoLaCopa,
    altText: 'Slide 3',
    caption: 'Slide 3'
  },
  {
    src: tapia,
    altText: 'Slide 4',
    caption: 'Slide 4'
  }
];

const Inicio = () => {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const tema = 'soccer messi';
    const apiKey = 'e08e9237c92a4a749bc489771a818b6d';
    const consulta = `https://newsapi.org/v2/everything?q=${tema}&sortBy=publishedAt&pageSize=5&language=es&apiKey=${apiKey}`;

    fetch(consulta)
      .then(resp => resp.json())
      .then(data => {
        setDatos(data.articles);
      })
      .catch(error => {
        console.log('error -->', error);
        
      });
  }, []);

  return (
    <>
      <h1 className="titulo-inicio">APP Scaloneta</h1>

      <CarouselInicio />

      <div className="divider"></div>

      <Container className="p-index-html">
        <Row>
          <Col>
            <p>
              ¡Bienvenidos a la nueva aplicación de la AFA! En este espacio podrás encontrar todo lo relacionado con la Selección Argentina de fútbol y su cuerpo técnico.
              Te invitamos a conocer nuestra nueva aplicación Web, esta herramienta permitirá al cuerpo técnico de la Selección Argentina llevar a cabo de manera eficiente la convocatoria de jugadores y la creación del 11 inicial para cada partido.
              Además, encontrarás toda la información actualizada sobre los jugadores, los próximos partidos y el desempeño de la Selección en cada torneo.
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

class CarouselInicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (

        
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <div className="parallax-container">
            <img src={item.src} alt={item.altText} className="parallax-image" />
          </div>
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}

export default Inicio;
export { Inicio, CarouselInicio };
