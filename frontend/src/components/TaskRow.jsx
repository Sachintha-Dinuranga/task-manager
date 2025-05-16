import { Link } from "react-router-dom";

function TaskRow({ task, onDelete }) {
  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="px-4 py-2">{task.title}</td>
      <td className="px-4 py-2">{task.assignedTo}</td>
      <td className="px-4 py-2">{task.status}</td>
      <td className="px-4 py-2">
        {new Date(task.deadline).toLocaleDateString()}
      </td>
      <td className="px-4 py-2 space-x-2">
        <Link
          to={`/task/${task._id}`}
          className="text-blue-600 hover:underline inline-block px-2 py-1 bg-blue-50 rounded"
        >
          View
        </Link>
        <Link
          to={`/edit-task/${task._id}`} // This navigates to Edit Task page
          className="text-blue-600 hover:underline"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TaskRow;
