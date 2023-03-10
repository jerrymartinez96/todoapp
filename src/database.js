import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    getDoc,
    getDocs,
    doc,
    query,
    where,
    onSnapshot,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDQV-We2pqV2MwyZ-Ngh5FwZL8NTLiCRUo",
    authDomain: "todoappcoppel.firebaseapp.com",
    projectId: "todoappcoppel",
    storageBucket: "todoappcoppel.appspot.com",
    messagingSenderId: "218046627993",
    appId: "1:218046627993:web:feb27d9cea217969fdb808",
    measurementId: "G-YJ4QPFL5C7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export const createUser = (data, callback) => {
    const usuariosRef = collection(db, 'usuarios');

    // Verificar si el usuario existe
    const consult = query(usuariosRef, where('username', '==', data.username));
    getDocs(consult).then((snapshot) => {
        if (!snapshot.empty) {
            const message = `El usuario ${data.username} ya existe`;
            callback({ success: false, message });
            return;
        }

        // Agregar nuevo usuario si no existe
        addDoc(usuariosRef, data)
            .then((docRef) => {
                const message = `Usuario creado exitosamente`;
                callback({ success: true, message });
            })
            .catch((error) => {
                const message = `Ocurrió un error al crear el usuario: ${error}`;
                callback({ success: false, message });
            });
    }).catch((error) => {
        const message = `Ocurrió un error: ${error}`;
        callback({ success: false, message });
    });
}

export const login = (user, callback) => {
    const usuariosRef = collection(db, 'usuarios');

    // Buscar usuario por nombre de usuario
    const consult = query(usuariosRef, where('username', '==', user.username));
    getDocs(consult).then((snapshot) => {
        if (snapshot.empty) {
            const message = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
            callback({ success: false, message });
            return;
        }

        // Comprobar la contraseña para cada documento encontrado
        snapshot.forEach((doc) => {
            const usuarioEncontrado = doc.data();
            if (usuarioEncontrado.password === user.password) {
                // Contraseña correcta, llamada de vuelta con éxito
                callback({ success: true, message: 'Inicio de sesión exitoso.' });
                return;
            } else {
                // Contraseña incorrecta
                const message = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
                callback({ success: false, message });
            }
        });


    }).catch((error) => {
        // Manejo de errores
        console.error(error);
        const message = 'Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.';
        callback({ success: false, message });
    });
}

export const createTask = (data, callback) => {
    const tasksRef = collection(db, 'tareas');

    // Verificar si la tarea existe
    const consult = query(tasksRef, where('description', '==', data.description));
    getDocs(consult).then((snapshot) => {
        if (!snapshot.empty) {
            const message = "La tarea ya existe";
            callback({ success: false, message });
            return;
        }

        // Agregar nueva tarea si no existe
        const newTask = {
            description: data.description,
            username: data.username,
            priority: data.priority || 1,
            completed: false,
            share: [],
            createdAt: new Date(),
        };

        addDoc(tasksRef, newTask)
            .then((docRef) => {
                const message = "Tarea creada exitosamente";
                callback({ success: true, message });
            })
            .catch((error) => {
                const message = `Ocurrió un error al crear la tarea: ${error}`;
                callback({ success: false, message });
            });
    }).catch((error) => {
        const message = `Ocurrió un error: ${error}`;
        callback({ success: false, message });
    });
}

export const getUserTasks = (username, callback) => {
    const tasksRef = collection(db, 'tareas');
    const consult = query(tasksRef, where('username', '==', username));

    onSnapshot(consult, (snapshot) => {
        const tasks = [];
        snapshot.forEach((doc) => {
            tasks.push({ id: doc.id, ...doc.data() });
        });
        callback({ success: true, tasks });
    }, (error) => {
        const message = `Ocurrió un error: ${error}`;
        callback({ success: false, message });
    });
}

export const completeTask = (taskId, completed, callback) => {
    const taskRef = doc(db, 'tareas', taskId);
    updateDoc(taskRef, { completed: completed })
        .then(() => {
            const message = "Tarea completada";
            callback({ success: true, message });
        })
        .catch((error) => {
            const message = `Ocurrió un error al completar la tarea: ${error}`;
            callback({ success: false, message });
        });
}

export const deleteTask = (taskId, callback) => {
    const taskRef = doc(db, 'tareas', taskId);
    deleteDoc(taskRef)
        .then(() => {
            const message = "Tarea eliminada";
            callback({ success: true, message });
        })
        .catch((error) => {
            const message = `Ocurrió un error al eliminar la tarea: ${error}`;
            callback({ success: false, message });
        });
}

export const updateTask = (id, data, callback) => {
    const taskRef = doc(db, 'tareas', id);

    // Verificar si la tarea existe
    getDoc(taskRef).then((doc) => {
        if (!doc.exists()) {
            const message = "La tarea no existe";
            callback({ success: false, message });
            return;
        }

        // Actualizar tarea existente
        const updatedTask = {
            description: data.description || doc.data().description,
            username: data.username || doc.data().username,
            priority: data.priority || doc.data().priority,
            completed: data.completed || doc.data().completed,
            share: data.share || doc.data().share,
            createdAt: doc.data().createdAt,
        };

        updateDoc(taskRef, updatedTask)
            .then(() => {
                const message = "Tarea actualizada exitosamente";
                callback({ success: true, message });
            })
            .catch((error) => {
                const message = `Ocurrió un error al actualizar la tarea: ${error}`;
                callback({ success: false, message });
            });
    }).catch((error) => {
        const message = `Ocurrió un error: ${error}`;
        callback({ success: false, message });
    });
};

export const shareTask = (taskId, sharedUsers, callback) => {
    const taskRef = doc(db, 'tareas', taskId);

    // Obtener el documento actual de la tarea
    getDoc(taskRef)
        .then((doc) => {
            if (!doc.exists()) {
                const message = "La tarea no existe";
                callback({ success: false, message });
                return;
            }

            // Verificar si el campo sharedUsers tiene cambios
            if (JSON.stringify(doc.data().sharedUsers) === JSON.stringify(sharedUsers)) {
                const message = "No se realizaron cambios en los usuarios compartidos";
                callback({ success: true, message });
                return;
            }

            // Actualizar la tarea con los nuevos usuarios compartidos
            updateDoc(taskRef, { sharedUsers })
                .then(() => {
                    const message = "Tarea compartida exitosamente";
                    callback({ success: true, message });
                })
                .catch((error) => {
                    const message = `Ocurrió un error al compartir la tarea: ${error}`;
                    callback({ success: false, message });
                });
        })
        .catch((error) => {
            const message = `Ocurrió un error: ${error}`;
            callback({ success: false, message });
        });
};
