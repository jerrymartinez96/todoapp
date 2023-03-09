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
        <nav className="bg-white px-2 sm:px-4 py-2.5  py-3 px-4 flex justify-between items-center border-b border-gray-200">
            <a href="/" className="flex items-center text-blue-600">
                <span className="font-bold text-lg">{username}</span>
            </a>
            <div className="flex-1 flex justify-center items-center hidden sm:block">
                <h3 className="text-xl font-semibold text-gray-900 text-center">
                    Lista de tareas
                </h3>
            </div>
            <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                onClick={handleLogout}
            >
                Salir
                <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </nav>
    );
}