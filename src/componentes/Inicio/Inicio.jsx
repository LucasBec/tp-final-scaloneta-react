//hook de react
import { useEffect, useState } from "react";
// componente personalizado
import { MiCard } from "./MiCard";
// clase de bootstrap
import { Alert } from "react-bootstrap";

export function Inicio(){
    
    const [datos, setDatos] = useState(null);

    useEffect(()=>{
        const tema = 'soccer messi';
        const apiKey = 'e08e9237c92a4a749bc489771a818b6d';
        const consulta = `https://newsapi.org/v2/everything?q=${tema}&sortBy=publishedAt&pageSize=5&language=es&apiKey=${apiKey}`;

        fetch(consulta)
        .then( resp => {
            resp.json().then(data => {
                // console.log(data);
                setDatos(data.articles);
            } )
        })
        .catch(error => {
            console.log('error -->', error);
        });

    }, []);

    return(
        <>
            <div>
                {
                    datos ? (datos.map((item, index) => (
                        <div key = {index}>
                            {/* <li> {item.title} </li> */}
                            <MiCard articulo = {item} />
                        </div>
                    ))) 
                    : 
                    (
                        <div className="container mt-5">
                            <Alert>buscando info.</Alert>
                        </div>
                    )
                }
            </div>
        </>
    )
}