import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import TaskCard from "../components/TaskCard";
import TaskFormModal from "../components/TaskFormModal";
import FilterBar from "../components/FilterBar";
import { useState } from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";


export default function Dashboard() {
    const { username } = useAuth();
    const { tasks } = useTasks();
    const { logout } = useAuth();
    const [filter, setFilter] = useState("all");

    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100">
            {/* Navbar */}
            <div className="bg-white border-b shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-indigo-600">
                        Task Manager
                    </h1>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg 
             text-sm font-medium text-red-500 
             hover:bg-red-50 hover:text-red-600 transition"
                    >
                        <ArrowRightOnRectangleIcon className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </div>

            {/*welcome*/}
            <div className="max-w-6xl mx-auto px-6 pt-6">
                <h2 className="text-xl font-semibold text-gray-700">
                    Welcome back,{" "}
                    <span className="text-indigo-600">
                        {username || "User"}
                    </span>{" "}
                    👋
                </h2>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
                {/* Add Task */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4">
                        ➕ Add New Task
                    </h2>
                    <TaskFormModal />
                </div>

                {/* Filter */}
                <FilterBar filter={filter} setFilter={setFilter} />

                {/* Tasks */}
                {filteredTasks.length === 0 ? (
                    <div className="text-center py-16 text-gray-500">
                        No tasks found
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTasks.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                )}
            </div>
            <footer className="mt-16 py-6 text-center text-sm 
                   bg-gradient-to-r from-indigo-50 to-gray-50 
                   border-t">
                <div className="flex flex-col items-center gap-1">
                    <span className="font-medium text-gray-600">
                        Built using React & Firebase
                    </span>
                    <span className="text-xs">
                        © {new Date().getFullYear()} Vikas Bhor
                    </span>
                </div>
            </footer>
        </div>
    );
}
