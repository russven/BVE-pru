import React from "react";
import { Link } from "react-router-dom";

// Si no hay props, no es necesario definir una interfaz
const Home: React.FC = () => {
    return (
        <div>
            <h1>¡Bienvenido a Bolsa de Valores del Entrenamiento (BVE)!</h1>
            <nav>
                <Link to="/login">Iniciar Sesión</Link> | <Link to="/register">Registrarse</Link>
            </nav>
        </div>
    );
};

export default Home;
