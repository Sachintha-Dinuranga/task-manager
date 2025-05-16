import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://task-manager-1-tcjh.onrender.com/api/tasks/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setTask(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch task details");
        setLoading(false);
      });
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!task) return <div className="p-6">Task not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={handleBack}
        className="mb-6 text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center"
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

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="border-b pb-4 mb-4">
          <h1 className="text-3xl font-bold text-gray-800">{task.title}</h1>
          <div className="mt-2 flex items-center">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium
              ${
                task.status === "Done"
                  ? "bg-green-100 text-green-800"
                  : task.status === "In Progress"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {task.status}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Description</h2>
            <p className="mt-2 text-gray-600">
              {task.description || "No description provided"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Assigned To
              </h2>
              <p className="mt-2 text-gray-600">{task.assignedTo}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Deadline</h2>
              <p className="mt-2 text-gray-600">
                {new Date(task.deadline).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Created</h2>
              <p className="mt-1 text-gray-600">
                {new Date(task.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">
                Last Updated
              </h2>
              <p className="mt-1 text-gray-600">
                {new Date(task.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
