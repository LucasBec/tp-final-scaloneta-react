import './Institucional.css';
export function Institucional() {
    return (
            <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="chiqui-tapia-inst mb-5">
                    <img src="img/tapia-1.jpg" alt="Tapia" className="img-fluid rounded"  style={{ borderRadius: '10%'}} title="Asociación de Futbol Argentino"/>
                    </div>
                    
                    <div className="col-md-6" style={{color: 'rgb(210, 210, 210)', fontSize:'24px'}}>
                        <h2 style={{fontSize:'3rem'}}>Historia</h2>
                        <p>La Asociación del Fútbol Argentino (AFA) es la entidad encargada de regular y organizar el fútbol en Argentina. Fue fundada el 21 de febrero de 1893, convirtiéndose en la quinta federación de fútbol en el mundo.
                            <br/><br/>
                            La historia de la AFA está estrechamente relacionada con la historia del fútbol en Argentina, que se remonta al final del siglo XIX, cuando los inmigrantes europeos introdujeron el deporte en el país. La primera asociación de fútbol en Argentina fue fundada en 1891, y dos años después se creó la Asociación del Fútbol Argentino.
                            <br/><br/>
                            Durante sus primeros años, la AFA se dedicó principalmente a organizar torneos regionales, pero con el tiempo se convirtió en una organización nacional. En la década de 1930, la AFA creó la Primera División, que se convirtió en la liga de fútbol más importante de Argentina.
                            <br/><br/>
                            La AFA también ha tenido un papel destacado en la organización de eventos internacionales de fútbol en Argentina. En 1978, el país organizó la Copa Mundial de la FIFA, que fue ganada por Argentina. La AFA también ha sido anfitriona de la Copa América en varias ocasiones.
                            <br/><br/>
                            Hoy en día, la AFA sigue siendo una organización vital para el fútbol en Argentina. Es responsable de organizar la liga profesional de fútbol, así como los equipos nacionales de fútbol masculino y femenino. La AFA trabaja incansablemente para mejorar el deporte en Argentina y promover el fútbol como un importante símbolo cultural del país.</p>
                            <br/><br/>

                        <h2 style={{fontSize:'3rem'}}>Visión</h2>
                        <p>La visión de la Asociación del Fútbol Argentino es convertirse en una organización de referencia en el fútbol mundial, promoviendo los valores del deporte y trabajando en pos del desarrollo y crecimiento del fútbol en Argentina y en el mundo.</p>
                        <br/><br/>

                        <h2 style={{fontSize:'3rem'}}>Misión</h2>
                        <p>La misión de la Asociación del Fútbol Argentino es liderar y fomentar el desarrollo del fútbol en Argentina, promoviendo la excelencia deportiva, la integridad y el fair play en todas sus actividades. Buscamos mejorar continuamente el deporte y fortalecer
                            la relación entre el fútbol y la sociedad, mediante la formación de jugadores y técnicos, la organización de competencias de alta calidad y el impulso de iniciativas sociales y comunitarias que promuevan la inclusión y el desarrollo humano.</p>
                            <br/>
                        <div className="escudo-afa-inst mb-5 ">
                            <img className='afa-youtube' src="img/afa.png"
                                title="Asociación de Futbol Argentino"
                                alt="Escudo AFA"/>
                        </div>
                    </div>
                </div>
            </div>
            </>
    )
}
