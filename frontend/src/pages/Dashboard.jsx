import { useEffect, useState } from "react";
import axios from "axios";
import TaskStatsCard from "../components/TaskStatCard";

function Dashboard({ user }) {
  const [tasks, setTasks] = useState([]);

  const userData = user?.user;

  useEffect(() => {
    console.log("Current user:", user);
    axios
      .get("https://task-manager-1-tcjh.onrender.com/api/tasks", {
        withCredentials: true,
      })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Failed to fetch tasks:", err));
  }, []);

  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "Pending").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const done = tasks.filter((t) => t.status === "Done").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Welcome, {userData?.displayName || user?.name || "User"}! 👋
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <TaskStatsCard
            label="Total Tasks"
            value={total}
            bgColor="bg-blue-100"
          />
          <TaskStatsCard
            label="Pending"
            value={pending}
            bgColor="bg-yellow-100"
          />
          <TaskStatsCard label="Done" value={done} bgColor="bg-green-100" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
