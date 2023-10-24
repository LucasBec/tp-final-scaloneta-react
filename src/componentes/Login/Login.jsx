
import Home from "../Inicio/Inicio.jsx";
import {useState} from "react";
import "./Login.css";

export const Login = () => {

    const [contraseña, setContraseña] = useState('');
    const [nombre, setNombre] = useState('');
    const [loginSuccessful, setLoginSuccessful] = useState(false);

    const handdleLogin = (e) =>{
        e.preventDefault();
        const data = {
            nombre: nombre,
            contraseña: contraseña
        };
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response=> response.json())
            .then(result => {
                console.log(result.token)
                if(result.token){
                    localStorage.setItem('token', result.token)
                    setLoginSuccessful(true);
                } else {
                    setLoginSuccessful(false);
                }
            })
            .catch(error =>{
                console.log(error)
            })
    }

    return(
        <>{loginSuccessful ? <Home />: <div className="form-container">
                <form>
                    <label className="custom-label">Usuario:</label>
                    <input onChange={(event)=>{setNombre(event.target.value)}}
                           placeholder="username"
                           className="custom-input"
                           type="text" />
                    <label className="custom-label">Contraseña:</label>
                    <input onChange={(event)=>{setContraseña(event.target.value)}}
                           placeholder="password"
                           className="custom-input"
                           type="password" />
                    <button className="custom-button" onClick={handdleLogin}>Login</button>
                </form>
            </div>}</>
    );
}
