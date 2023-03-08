import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Register } from "./views/Register";
import { Login } from "./views/Login";
import { Todo } from "./views/Todo";

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Navigate to="/register" />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Todo />} />
            </Routes>
        </div>
    );
}

export default App;