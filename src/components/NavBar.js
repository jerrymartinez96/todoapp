import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState("");

    const navigate = useNavigate();

    // Verificar si hay sesión iniciada al cargar la página
    useEffect(() => {
        const sessionData = JSON.parse(sessionStorage.getItem("session"));
        if (sessionData !== null && sessionData.isLogged === true) {
            setUsername(sessionData.username);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("session");
        setIsLoggedIn(false);
        navigate("/login");
    }

    return (
        <nav className="bg-gray-800 py-3 px-4 flex justify-between items-center">
            <a href="/" className="flex items-center text-blue-600">
                <span className="font-bold text-lg">{username}</span>
            </a>
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded" onClick={handleLogout}>
                Cerrar sesión
            </button>
        </nav>
    );
}