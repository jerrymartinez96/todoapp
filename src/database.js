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
                const message = `Usuario creado con el ID: ${docRef.id}`;
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