import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const TaskContext = createContext();
export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, "tasks"),
            where("uid", "==", user.uid)
        );

        const unsub = onSnapshot(q, (snapshot) => {
            setTasks(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );
        });

        return unsub;
    }, [user]);

    const addTask = async (task) => {
        await addDoc(collection(db, "tasks"), {
            ...task,
            uid: user.uid,
            completed: false,
            createdAt: new Date(),
        });
    };

    const toggleStatus = async (id, completed) => {
        await updateDoc(doc(db, "tasks", id), {
            completed: !completed,
        });
    };

    const deleteTask = async (id) => {
        await deleteDoc(doc(db, "tasks", id));
    };

    return (
        <TaskContext.Provider
            value={{ tasks, addTask, toggleStatus, deleteTask, filter, setFilter }}
        >
            {children}
        </TaskContext.Provider>
    );
};
