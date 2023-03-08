import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    // doc,
    // getDoc,
    query,
    where,
    // setDoc,
    // deleteDoc,
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
        console.log(snapshot)
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
            }else{
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