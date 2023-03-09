import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AddTaskModal } from "../components/AddTaskModal";
import { FilterBar } from "../components/FilterBar";
import { Navbar } from "../components/NavBar";
import { TaskList } from "../components/TaskList";
import { createTask, getUserTasks, completeTask, deleteTask } from "../database";

export const Todo = ({ setIsLoggedIn }) => {
    const [tasks, setTasks] = useState([]);
    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("date");
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleAddTask = (newTask) => {
        createTask(newTask, ({ success, message }) => {
            if (success) {
                toast.success(message);
            } else {
                toast.error(message);
            }
        });
    };

    const handleCompleteTask = (taskId, completed) => {
        completeTask(taskId, completed, ({ success, message }) => {
            if (success) {
                // Actualizar la tarea completada en el estado
                const updatedTasks = tasks.map((task) =>
                    task.id === taskId ? { ...task, completed: completed } : task
                );
                setTasks(updatedTasks);
                // toast.success(message);
            } else {
                toast.error(message);
            }
        });
    };

    const handleDeleteTask = (taskId) => {
        deleteTask(taskId, ({ success, message }) => {
            if (success) {
                // Eliminar la tarea del estado
                // const updatedTasks = tasks.filter((task) => task.id !== taskId);
                // setTasks(updatedTasks);
                toast.success(message);
            } else {
                toast.error(message);
            }
        });
    };

    useEffect(() => {
        const sessionData = JSON.parse(sessionStorage.getItem("session"));
        let username = "";
        if (sessionData !== null && sessionData.isLogged === true) {
            username = sessionData.username;
        }
        getUserTasks(username, (data) => {
            if (data.success) {
                setTasks(data.tasks);
                // console.log(data.tasks);
            } else {
                toast.error(data.message);
            }
        });
    }, []);

    return (
        <>
            <Navbar setIsLoggedIn={setIsLoggedIn} />
            <div style={{ height: "50px" }}></div>
            <div className="container mx-auto py-8">
                <div className="w-full p-4 text-center bg-white border border-gray-200 shadow sm:p-8">
                    <TaskList
                        tasks={tasks}
                        category={category}
                        sortOrder={sortOrder}
                        onCompleteTask={handleCompleteTask}
                        onDeleteTask={handleDeleteTask}
                    />
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
};