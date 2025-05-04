import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">
              Admission Portal
            </Link>
            <div className="space-x-4">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <Link to="/admin" className="hover:underline">
                Admin
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-6">
          <div className="container mx-auto text-center">
            <p>
              &copy; {new Date().getFullYear()} Admission Portal. All rights
              reserved.
            </p>
          </div>
        </footer>

        {/* Toast Container for notifications */}
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </Router>
  );
}

export default App;
