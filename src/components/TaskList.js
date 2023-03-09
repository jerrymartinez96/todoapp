import React from "react";
import { TaskItem } from "./TaskItem";

export const TaskList = ({ tasks, category, sortOrder, onCompleteTask, onDeleteTask}) => {
    // Filtrar las tareas en función de la categoría seleccionada (todas, completadas o pendientes)
    const filteredTasks = category === "all" ? tasks : tasks.filter((task) => task.completed === (category === "completed"));

    // Ordenar las tareas en función de la fecha de creación (de más reciente a más antigua) 
    // o la prioridad (de mayor a menor)
    const sortedTasks = filteredTasks.sort((task1, task2) =>
        sortOrder === "date"
            ? task2.createdAt.toDate() - task1.createdAt.toDate()
            : task2.priority - task1.priority
    );

    // Renderiza la lista de tareas utilizando el componente TaskItem para cada tarea
    return (
        <>
            {sortedTasks.map((task) => (
                <TaskItem key={task.id} task={task} onCompleteTask={onCompleteTask} onDeleteTask={onDeleteTask}/>
            ))}
        </>
    );
};




