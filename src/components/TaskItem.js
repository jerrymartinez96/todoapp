import React from "react";

export const TaskItem = ({ task }) => {
    const priorityStyles = [
        "",
        "p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50",
        "p-4 mb-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50",
        "p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50",
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
                    <button type="button" className="text-gray-800 bg-transparent border border-gray-700 hover:bg-gray-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center" data-dismiss-target="#alert-additional-content-1" aria-label="Close">
                        Completar
                    </button>
                }
            </div>
        </div>
    );
};