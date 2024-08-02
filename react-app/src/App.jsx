import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import ViewStudents from './pages/ViewStudents';
import AddStudent from './pages/AddStudent';
import StudentDetails from './pages/StudentDetails';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes - All Authenticated Users */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendance"
              element={
                <ProtectedRoute>
                  <Attendance />
                </ProtectedRoute>
              }
            />

            {/* Admin & Staff Only Routes */}
            <Route
              path="/students"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'STAFF']}>
                  <ViewStudents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/students/add"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'STAFF']}>
                  <AddStudent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/students/:usn"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'STAFF']}>
                  <StudentDetails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
