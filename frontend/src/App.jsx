import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "./pages/NotFound";
import AddTask from "./pages/AddTask";
import Profile from "./pages/Profile";
import TaskList from "./pages/TaskList";
import EditTask from "./pages/EditTask";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from backend
    axios
      .get("http://localhost:5000/auth/profile", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/add-task"
          element={user ? <AddTask /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/tasks"
          element={user ? <TaskList /> : <Navigate to="/" />}
        />
        <Route
          path="/edit-task/:id"
          element={user ? <EditTask /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
