export default function FilterBar({ filter, setFilter }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
                Filter Tasks
            </span>

            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
            >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>
        </div>
    );
}
