// import { Link } from "react-router-dom";
// function Dashboard({ user }) {
//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold">Dashboard</h1>
//       <p className="mt-4">Welcome, {user.displayName}!</p>
//       <img src={user.photo} alt="Profile" className="w-20 rounded-full mt-4" />
//       <Link to="/profile" className="text-blue-600 underline">
//         Profile
//       </Link>
//     </div>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TaskStatsCard from "../components/TaskStatCard";

function Dashboard({ user }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks", { withCredentials: true })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Failed to fetch tasks:", err));
  }, []);

  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "Pending").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const done = tasks.filter((t) => t.status === "Done").length;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user.displayName} 👋
      </h1>

      {/* <TaskStatsCard label="Total Tasks" value={total} bgColor="bg-blue-100" />
      <TaskStatsCard label="Pending" value={pending} bgColor="bg-yellow-100" />
      <TaskStatsCard label="Done" value={done} bgColor="bg-green-100" /> */}

      <div className="flex flex-wrap gap-4">
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
  );
}

export default Dashboard;
