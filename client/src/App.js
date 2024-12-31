import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Auth from './pages/Auth';
import StudentDashboard from './pages/StudentDashboard';
import MentorDashboard from './pages/MentorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AddStudent from './pages/AddStudent';
import AddMentor from './pages/AddMentor';
import EditTask from './pages/EditTask';
import ManageTasks from './pages/ManageTasks';
import { AuthProvider } from './Authecontext';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Auth />} />

          {/* Protected Routes */}
          <Route
            path="/student-dashboard"
            element={
              <PrivateRoute role="student">
                <StudentDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/mentor-dashboard"
            element={
              <PrivateRoute role="mentor">
                <MentorDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-task/:id"
            element={
              <PrivateRoute role="mentor">
                <EditTask />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-tasks/:id"
            element={
              <PrivateRoute role="mentor">
                <ManageTasks />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/add-student"
            element={
              <PrivateRoute role="admin">
                <AddStudent />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/add-mentor"
            element={
              <PrivateRoute role="admin">
                <AddMentor />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
