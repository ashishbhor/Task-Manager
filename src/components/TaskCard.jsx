import { useTasks } from "../context/TaskContext";
import confetti from "canvas-confetti";

export default function TaskCard({ task }) {
    const { toggleStatus, deleteTask } = useTasks();
    const isCompleted = task.completed;

    const handleComplete = () => {
        toggleStatus(task.id, task.completed);

        if (!task.completed) {
            confetti({
                particleCount: 70,
                spread: 80,
                origin: { y: 0.6 },
            });
        }
    };

    return (
        <div
            className={`relative p-5 rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg

      ${isCompleted
                    ? "bg-green-50 border-l-4 border-green-500"
                    : "bg-yellow-50 border-l-4 border-yellow-400"
                }`}
        >
            {/* Status Badge */}
            <span
                className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full
        ${isCompleted
                        ? "bg-green-200 text-green-700"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
            >
                {isCompleted ? "Completed" : "Pending"}
            </span>

            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {task.title}
            </h3>

            <p className="text-sm text-gray-600 mb-3">
                {task.description}
            </p>

            <p className="text-xs text-gray-500 mb-4">
                📅 Due: {task.dueDate}
            </p>

            <div className="flex gap-3">
                <button
                    onClick={handleComplete}
                    disabled={isCompleted}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition
          ${isCompleted
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                >
                    {isCompleted ? "Completed" : "Mark Complete"}
                </button>

                <button
                    onClick={() => deleteTask(task.id)}
                    className="flex-1 py-2 rounded-lg text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
