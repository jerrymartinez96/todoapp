import { useState } from "react";
import { AddTaskModal } from "../components/AddTaskModal";
import { FilterBar } from "../components/FilterBar";
import { Navbar } from "../components/NavBar";
import { TaskList } from "../components/TaskList";

const initialTasks = [
    {
        id: 1,
        description: "Configurar notificaciones en la app",
        priority: 2,
        completed: true,
        createdAt: "2023-03-08",
    },
    {
        id: 2,
        description: "Cambiar estilos de toda la pagina",
        priority: 1,
        completed: true,
        createdAt: "2023-03-07",
    },
    {
        id: 3,
        description: "Validar que solamente se pueda compartir tareas con usuarios creados",
        priority: 2,
        completed: false,
        createdAt: "2023-03-06",
    },
    {
        id: 4,
        description: "Crear funcionalidad compartir tarea",
        priority: 3,
        completed: false,
        createdAt: "2023-03-05",
    },
    {
        id: 5,
        description: "Mostrar numero de cuantos usuarios tienen compartida la tarea",
        priority: 1,
        completed: false,
        createdAt: "2023-03-04",
    },
];

export const Todo = ({ setIsLoggedIn }) => {
    const [tasks, setTasks] = useState(initialTasks);
    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("date");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
    };

    const handleSortOrderChange = (newSortOrder) => {
        setSortOrder(newSortOrder);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Navbar setIsLoggedIn={setIsLoggedIn} />
            <div className="container mx-auto py-8">
                <div className="w-full p-4 text-center bg-white border border-gray-200 shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <TaskList tasks={tasks} category={category} sortOrder={sortOrder} />
                </div>
            </div>
            <div style={{ height: "100px" }}></div>
            <FilterBar
                openModal={openModal}
                category={category}
                onCategoryChange={handleCategoryChange}
                sortOrder={sortOrder}
                onSortOrderChange={handleSortOrderChange}
            />
            <AddTaskModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onAddTask={handleAddTask}
            />
        </>
    );
}