import React, { Fragment } from "react";
import { Menu, Transition } from '@headlessui/react';

export const TaskItem = ({ task, onCompleteTask, onDeleteTask}) => {

    const handleOnCheck = () => {
        onCompleteTask(task.id, !task.completed);
    }

    const handleDalete = () => {
        onDeleteTask(task.id);
    }
    const priorityStyles = [
        "",
        "flex p-4 mb-4 text-blue-800 border-t-4 border-blue-300 bg-blue-50",
        "flex p-4 mb-4 text-yellow-800 border-t-4 border-yellow-300 bg-yellow-50",
        "flex p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50",
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
        <div id="alert-border-1" className={`${priorityStyles[task.priority]} ${priorityClass}`} role="alert">
            <div className={`ml-3 text-sm font-medium ${task.completed ? "line-through" : ""}`}>{task.description}</div>
            <div className="ml-auto h-8 w-8">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center rounded-md  px-1 text-sm font-medium text-gray-500 hover:bg-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right opacity-0 rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="p-4">
                                <Menu.Item className="mt-3">
                                    <div className="flex p-2 rounded justify-center">
                                        <label className="relative inline-flex items-center w-full cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={task.completed}
                                                className="sr-only peer"
                                                onChange={handleOnCheck}
                                            />
                                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                            <span className="ml-3 text-sm font-medium text-gray-900">{task.completed ? "Completada" : "Completar"}</span>
                                        </label>
                                    </div>
                                </Menu.Item>
                                <Menu.Item className="mt-3">
                                    <button className='text-center bg-blue-100 text-gray-600 hover:bg-blue-500 hover:text-white w-full rounded-md px-2 py-2 text-sm'>
                                        Editar
                                    </button>
                                </Menu.Item>
                                <Menu.Item className="mt-3">
                                    <button className='text-center bg-red-100 text-gray-600 hover:bg-red-500 hover:text-white w-full rounded-md px-2 py-2 text-sm' onClick={handleDalete}>
                                        Eliminar
                                    </button>
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    );
};
