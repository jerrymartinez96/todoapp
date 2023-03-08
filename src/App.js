import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Register } from "./views/Register";
import { Login } from "./views/Login";
import { Todo } from "./views/Todo";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Verificar si hay sesión iniciada al cargar la página
    useEffect(() => {
        const isLogged = sessionStorage.getItem('isLogged');
        if (isLogged === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <div className="App">
            <Routes>
                {isLoggedIn ? (
                    // Rutas protegidas para usuarios autenticados
                    <>
                        <Route path="/home" element={<Todo />} />
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/register" element={<Navigate to="/home" />} />
                        <Route path="/login" element={<Navigate to="/home" />} />
                    </>
                ) : (
                    // Rutas para usuarios no autenticados
                    <>
                        <Route path="/" element={<Navigate to="/register" />} />
                        <Route path="/home" element={<Navigate to="/register" />} />
                        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    </>
                )}
            </Routes>
            <ToastContainer />
        </div>
    );
}

export default App;