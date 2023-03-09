import React from "react";

export const FilterBar = ({ openModal, category, onCategoryChange, sortOrder, onSortOrderChange }) => {

    const handleCategoryChange = (category) => {
        onCategoryChange(category);
    }

    // const handleSortOrderChange = (event) => {
    //     onSortOrderChange(event.target.value);
    // };

    // const handleFilterClick = (value) => {
    //     onCategoryChange(value);
    // };

    return (
        <div className="fixed bottom-0 z-50 w-full -translate-x-1/2 bg-white border-t border-gray-200 left-1/2 dark:bg-gray-700 dark:border-gray-600">
            <div className="w-full">
                <div className="grid max-w-xs grid-cols-3 gap-1 p-1 mx-auto my-2 bg-gray-100 rounded-lg dark:bg-gray-600" role="group">
                    <button
                        type="button"
                        className={`px-5 py-1.5 text-xs font-medium ${category === "all" ? "text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900 rounded-lg" : "text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg"}`}
                        onClick={() => handleCategoryChange("all")}
                    >
                        Todas
                    </button>
                    <button
                        type="button"
                        className={`px-5 py-1.5 text-xs font-medium ${category === "completed" ? "text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900 rounded-lg" : "text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg"}`}
                        onClick={() => handleCategoryChange("completed")}
                    >
                        Completedas
                    </button>
                    <button
                        type="button"
                        className={`px-5 py-1.5 text-xs font-medium ${category === "pending" ? "text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900 rounded-lg" : "text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg"}`}
                        onClick={() => handleCategoryChange("pending")}
                    >
                        Pendientes
                    </button>
                </div>
            </div>
            <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
                <button
                    type="button"
                    className={`inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 ${sortOrder === "date" ? "bg-gray-100 dark:bg-gray-700" : ""}`}
                    onClick={() => onSortOrderChange("date")}
                >
                    <span className="font-medium text-gray-900">Fecha</span>
                </button>
                <button
                    type="button"
                    className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                    onClick={() => openModal()}
                >
                    <svg className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path clipRule="evenodd" fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path>
                    </svg>
                </button>
                <button type="button" className={`inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 ${sortOrder === "priority" ? "bg-gray-100 dark:bg-gray-700" : ""}`} onClick={() => onSortOrderChange("priority")}>
                    <span className="font-medium text-gray-900">Prioridad</span>
                </button>
            </div>
        </div>
    );
};