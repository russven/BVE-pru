import React, { useState } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
    const [formData, setFormData] = useState<{ name: string; email: string; password: string }>({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/users/register', formData);
            alert('Usuario registrado: ' + response.data.user.name);
        } catch (error) {
            console.error(error);
            alert('Error al registrar usuario.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registro</h2>
            <input type="text" name="name" placeholder="Nombre" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Correo" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
            <button type="submit">Registrar</button>
        </form>
    );
};

export default Register;
