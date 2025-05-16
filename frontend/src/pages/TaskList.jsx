import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Link, useNavigate } from "react-router-dom";
import TaskRow from "../components/TaskRow";
import toast from "react-hot-toast";

function TaskList() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks", { withCredentials: true })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Failed to load tasks", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        withCredentials: true,
      });
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success("Task deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    // Add title to the PDF
    doc.setFontSize(16);
    doc.text("Task Report", 14, 16);

    // Generate the table
    autoTable(doc, {
      head: [["Title", "Assigned To", "Status", "Deadline"]],
      body: filteredTasks.map((task) => [
        task.title,
        task.assignedTo,
        task.status,
        new Date(task.deadline).toLocaleDateString(),
      ]),
      startY: 20,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [66, 139, 202],
        textColor: 255,
      },
    });

    doc.save("task-report.pdf");
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Filter and sort logic
  let filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    .filter((task) => (filterStatus ? task.status === filterStatus : true));

  if (sortBy === "title") {
    filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "deadline") {
    filteredTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-800 transition-all duration-200 flex items-center group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 transform group-hover:-translate-x-1 transition-transform"
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
              <span className="ml-2 font-medium">Back</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-800">All Tasks</h1>
          </div>
          <button
            onClick={generatePDF}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download PDF
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
          >
            <option value="">All Status</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
          >
            <option value="">Sort By</option>
            <option value="title">Title</option>
            <option value="deadline">Deadline</option>
          </select>
        </div>

        {/* Task Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TaskRow key={task._id} task={task} onDelete={handleDelete} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No tasks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TaskList;
