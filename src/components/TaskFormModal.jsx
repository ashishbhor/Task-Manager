import { useState } from "react";
import { useTasks } from "../context/TaskContext";

export default function TaskFormModal() {
    const { addTask } = useTasks();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const submit = () => {
        if (!title || !dueDate) {
            alert("Title and Due Date are required");
            return;
        }

        addTask({ title, description, dueDate });
        setTitle("");
        setDescription("");
        setDueDate("");
    };

    return (
        <>
            {/* TITLE + DATE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* TITLE */}
                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="
            w-full sm:w-80
            px-4 py-3
            text-sm
            border-2 border-gray-400
            rounded-xl
            bg-white
            focus:border-indigo-500
            focus:ring-2 focus:ring-indigo-200
            outline-none
          "
                />

                {/* DATE WITH FAKE PLACEHOLDER */}
                <div className="relative w-full sm:w-56">
                    {!dueDate && (
                        <span
                            className="
                absolute left-4 top-1/2 -translate-y-1/2
                text-sm text-gray-400 pointer-events-none
              "
                        >
                            Select date
                        </span>
                    )}

                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="
              w-full
              px-4 py-3
              text-sm
              border-2 border-gray-400
              rounded-xl
              bg-white
              focus:border-indigo-500
              focus:ring-2 focus:ring-indigo-200
              outline-none
            "
                    />
                </div>
            </div>

            {/* DESCRIPTION */}
            <textarea
                placeholder="Short description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="
          w-full
          px-4 py-3
          text-sm
          border-2 border-gray-400
          rounded-xl
          bg-white
          resize-none
          focus:border-indigo-500
          focus:ring-2 focus:ring-indigo-200
          outline-none
          mb-5
        "
            />

            {/* BUTTON */}
            <div className="flex justify-center">
                <button
                    onClick={submit}
                    className="
            px-10 py-3
            bg-green-500 hover:bg-green-600
            text-white text-sm font-medium
            rounded-xl
            shadow-md
            transition"
                >
                    Add Task
                </button>
            </div>
        </>
    );
}
