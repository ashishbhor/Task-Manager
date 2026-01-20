import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);

    // Listen to auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                try {
                    const docRef = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setUsername(docSnap.data().username);
                    }
                } catch (error) {
                    console.error("Error fetching username:", error);
                }
            } else {
                setUsername(null);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // LOGIN
    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    // REGISTER
    const register = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    // LOGOUT
    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider
            value={{ user, username, login, register, logout }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};
