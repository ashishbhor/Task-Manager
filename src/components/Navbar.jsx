import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { logout } = useAuth();

    return (
        <div className="bg-white shadow px-6 py-4 flex justify-between">
            <h1 className="text-xl font-bold">Task Manager</h1>
            <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-1 rounded"
            >
                Logout
            </button>
        </div>
    );
}
