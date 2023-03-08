import { Navbar } from "../components/NavBar";

export const Todo = ({ setIsLoggedIn }) => {
    return (
        <>
            <Navbar  setIsLoggedIn={setIsLoggedIn} />
            <div className="container mx-auto py-6">
                <h1 className="text-3xl font-bold mb-6">Lista de tareas</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <TodoItem />
                    <TodoItem />
                    <TodoItem />
                </div>
            </div>
        </>
    );
}

export const TodoItem = () => {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold mb-2">Tarea 1</h2>
            <p className="text-gray-700">Descripción de la tarea 1</p>
            <button className="bg-red-500 text-white rounded-lg py-2 px-4 mt-4">Eliminar</button>
        </div>
    );
}