//import navbar
import Navbar from "./Navbar";

function Layout({ user, children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      <div className="p-6 max-w-6xl mx-auto">{children}</div>
    </div>
  );
}

export default Layout;
