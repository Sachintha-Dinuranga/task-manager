import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTask() {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    deadline: "",
    assignedTo: "",
    status: "Pending",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!task.title || !task.deadline || !task.assignedTo) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      await axios.post("https://task-manager-1-tcjh.onrender.com/api/tasks", task, {
        withCredentials: true,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Task creation failed");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <button
        onClick={handleBack}
        className="mb-4 text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="ml-2">Back</span>
      </button>
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={task.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="date"
          name="deadline"
          value={task.deadline}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="assignedTo"
          placeholder="Assigned To"
          value={task.assignedTo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;
