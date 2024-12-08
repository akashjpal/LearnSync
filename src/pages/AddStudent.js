// src/pages/AddStudent.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';

const AddStudent = ({ onAddStudent }) => {
  const [student, setStudent] = useState({
    name: '',
    course: '',
    rollNumber: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddStudent) {
      onAddStudent(student); // Calls parent function if provided
    }
    navigate('/admin-dashboard'); // Navigate back to the dashboard
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Add Student
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Course"
            name="course"
            value={student.course}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Roll Number"
            name="rollNumber"
            value={student.rollNumber}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Add Student
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AddStudent;
