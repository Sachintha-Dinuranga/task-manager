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
import Layout from "./components/Layout";
import TaskDetails from "./pages/TaskDetails";
import { Toaster } from "react-hot-toast";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from backend
    axios
      .get("http://localhost:5000/auth/profile", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = () => {
    setUser(null); // Clear user state on logout
  };

  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
      />
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
          element={
            user ? (
              <Layout user={user}>
                <Dashboard user={user} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/add-task"
          element={
            user ? (
              <Layout user={user}>
                <AddTask />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            user ? (
              <Layout user={user}>
                <Profile user={user} onLogout={handleLogout} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/tasks"
          element={
            user ? (
              <Layout user={user}>
                <TaskList />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/edit-task/:id"
          element={
            user ? (
              <Layout user={user}>
                <EditTask />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/task/:id"
          element={
            user ? (
              <Layout user={user}>
                <TaskDetails />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
