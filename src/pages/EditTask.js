// src/pages/EditTask.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
} from '@mui/material';

const EditTask = () => {
  const { rollNumber } = useParams(); // Get the roll number from the URL
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      // Simulate fetching tasks based on roll number
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, title: 'Task 1: Complete the project proposal', dueDate: '2024-11-10' },
            { id: 2, title: 'Task 2: Implement feature X', dueDate: '2024-11-15' },
          ]);
        }, 1000);
      });
      setTasks(response);
      setLoading(false);
    };

    fetchTasks();
  }, [rollNumber]);

  const handleEdit = (id, updatedTitle) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: updatedTitle } : task
      )
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Updated Tasks:', tasks);
    alert('Tasks have been updated!');
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Tasks for Student Roll Number: {rollNumber}
      </Typography>
      <form onSubmit={handleSubmit}>
        {tasks.map((task) => (
          <Box key={task.id} sx={{ mb: 2 }}>
            <TextField
              label="Task Title"
              defaultValue={task.title}
              variant="outlined"
              fullWidth
              onChange={(e) => handleEdit(task.id, e.target.value)}
            />
            <TextField
              label="Due Date"
              type="date"
              defaultValue={task.dueDate}
              variant="outlined"
              fullWidth
              sx={{ mt: 1 }}
              onChange={(e) => handleEdit(task.id, e.target.value)}
            />
          </Box>
        ))}
        <Button type="submit" variant="contained" color="primary">Save Tasks</Button>
      </form>

      {/* Timeline Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Task Timeline
      </Typography>
      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item xs={12} md={6} key={task.id}>
            <Paper elevation={2} sx={{ padding: 2, bgcolor: '#E8F5E9' }}>
              <Typography variant="h6">{task.title}</Typography>
              <Typography variant="body2">Due Date: {task.dueDate}</Typography>
              <Typography variant="body2" color={new Date(task.dueDate) < new Date() ? 'red' : 'green'}>
                Status: {new Date(task.dueDate) < new Date() ? 'Overdue' : 'On Time'}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EditTask;
