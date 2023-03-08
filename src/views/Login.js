import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../database';

export const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        login({ username, password }, (resp) => {
            if (resp.success) {
                // Si el usuario se creó exitosamente, se guarda información de la sesión en el almacenamiento del navegador
                const sessionData = { isLogged: true, username };
                sessionStorage.setItem("session", JSON.stringify(sessionData));

                setIsLoggedIn(true);
                navigate("/home");
                // Muestra una notificación de éxito y redirige al usuario a la página de inicio
                // toast.success(resp.message, {
                //     onClose: () => {
                //     },
                // });
            } else {
                // Muestra una notificación de error si hubo algún problema al crear el usuario
                toast.error(resp.message);
                setIsLoading(false);
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Inicio sesion para acceder a tu cuenta</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                        Registrate
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Usuario
                            </label>
                            <div className="mt-1">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                                disabled={isLoading}
                            >
                                {isLoading ? "Iniciando..." : "Iniciar Sesion"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};