import { Link } from "react-router-dom";

function Navbar({ user }) {
  return (
    <div className="bg-white shadow-md">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <Link
            to="/dashboard"
            className="text-xl font-bold hover:text-blue-600 transition-colors duration-200"
          >
            Task Manager
          </Link>
          <div className="flex gap-4">
            <Link
              to="/add-task"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              ➕ Add Task
            </Link>
            <Link
              to="/tasks"
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              📋 View All Tasks
            </Link>
            <Link
              to="/profile"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              👤 Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
