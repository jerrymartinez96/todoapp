import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export function AddTaskModal({ task, isOpen, onClose, onAddTask, onUpdateTask, isEditing }) {
    const [taskID, setTaskID] = useState('');
    const [taskText, setTaskText] = useState('');
    const [priority, setPriority] = useState('1');
    const [username, setUsername] = useState('');


    const handleTaskChange = (event) => {
        setTaskText(event.target.value);
    };

    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    };

    const handleAddTask = (event) => {
        event.preventDefault();
        if(isEditing){
            onUpdateTask(taskID, {description: taskText, priority});
            onClose();
            setTaskID('');
            setTaskText('');
            setPriority('1');
        }else{
            const newTask = {
                username: username,
                description: taskText,
                priority: parseInt(priority),
                completed: false,
                createdAt: new Date().toISOString().slice(0, 10),
            };
            onAddTask(newTask);
            onClose();
            setTaskText('');
            setPriority('1');
        }
    };

    useEffect(() => {
        if(isEditing){
            setTaskID(task.id);
            setTaskText(task.description);
            setPriority(task.priority);
        }
        const sessionData = JSON.parse(sessionStorage.getItem("session"));
        if (sessionData !== null && sessionData.isLogged === true) {
            setUsername(sessionData.username);
        }
    }, [isEditing, task]);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg text-center font-medium leading-6 text-gray-900"
                                >
                                    {isEditing? "Editar tarea" : "Agregar nueva tarea"}
                                </Dialog.Title>
                                <form onSubmit={handleAddTask}>
                                    <div className="mb-4">
                                        <label htmlFor="task" className="block mb-2 text-sm font-medium text-gray-900">Tarea</label>
                                        <textarea
                                            id="task"
                                            rows="3"
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            value={taskText}
                                            onChange={handleTaskChange}
                                        ></textarea>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="priority" className="block mb-2 text-sm font-medium text-gray-900">Prioridad</label>
                                        <select
                                            id="priority"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            value={priority}
                                            onChange={handlePriorityChange}
                                        >
                                            <option value="1">Baja</option>
                                            <option value="2">Media</option>
                                            <option value="3">Alta</option>
                                        </select>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            className="border px-4 py-2 mr-4 rounded-md text-gray-500 hover:text-gray-700"
                                            onClick={onClose}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                                        >
                                            {isEditing? "Editar" : "Agregar"}
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

