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
import ManageTasks from './pages/ManageTasks'; // Adjust the import based on your folder structure

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/mentor-dashboard" element={<MentorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/edit-tasks/:rollNumber" element={<EditTask />} />
        <Route path="/manage-tasks" element={<ManageTasks />} /> 
        <Route path="/admin/add-student" element={<AddStudent />} />
        <Route path="/admin/add-mentor" element={<AddMentor />} />
    
      </Routes>
    </Router>
  );
};

export default App;
