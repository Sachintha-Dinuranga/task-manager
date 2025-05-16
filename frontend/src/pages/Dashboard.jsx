import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TaskStatsCard from "../components/TaskStatCard";
import Navbar from "../components/Navbar";

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
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      <div className="p-6 max-w-4xl mx-auto">
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
