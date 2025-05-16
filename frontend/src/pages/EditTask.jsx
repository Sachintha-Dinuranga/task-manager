import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    deadline: "",
    assignedTo: "",
    status: "Pending",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/tasks/${id}`, { withCredentials: true })
      .then((res) => {
        const data = res.data;
        setTask({
          title: data.title,
          description: data.description || "",
          deadline: data.deadline ? data.deadline.split("T")[0] : "",
          assignedTo: data.assignedTo,
          status: data.status,
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch task");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.title || !task.deadline || !task.assignedTo) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, task, {
        withCredentials: true,
      });
      navigate("/tasks");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
    }
  };

  if (loading) return <p className="p-6">Loading task data...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
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
          Update Task
        </button>
      </form>
    </div>
  );
}

export default EditTask;
