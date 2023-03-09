import React from "react";

export const TaskItem = ({ task }) => {
    const priorityStyles = [
        "",
        "p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800",
        "p-4 mb-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400 dark:border-yellow-800",
        "p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800",
    ];
    const priorityClass =
        task.priority === 1
            ? "danger"
            : task.priority === 2
                ? "warning"
                : task.priority === 3
                    ? "info"
                    : "";

    return (
        <div
            className={`${priorityStyles[task.priority]} ${priorityClass}`}
            role="alert"
        >
            <div className="mt-2 mb-4 text-sm">{task.description}</div>
            <div className="flex">
                {task.completed ?
                    "Completada"
                    :
                    <button type="button" className="text-gray-800 bg-transparent border border-gray-700 hover:bg-gray-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-800 dark:text-gray-300 dark:hover:text-white" data-dismiss-target="#alert-additional-content-1" aria-label="Close">
                        Completar
                    </button>
                }
            </div>
        </div>
    );
};