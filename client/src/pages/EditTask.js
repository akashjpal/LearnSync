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
} from '@mui/material';
import axios from 'axios';
import { getStandardDate } from '../helpers/getDate';

const EditTask = () => {
  const { id } = useParams(); // Get the task ID from the URL
  console.log(`Task ID: ${id}`);
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const res = await axios.post(`http://localhost:3001/assign/get-tasks-with-id`, { task_id: id });
        setTask(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleFieldChange = (field, value) => {
    setTask((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3001/assign/edit-task`, task);
      console.log(res);
      alert('Task updated successfully!');
    } catch (error) {
      console.log(error);
      alert('Failed to update task.');
    }
  };

  const formatDateForInput = (date) => {
    const jsDate = new Date(date); // Convert to JS Date object
    return jsDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!task) {
    return <Typography>Task not found!</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Task Description"
            value={task.description}
            variant="outlined"
            fullWidth
            onChange={(e) => handleFieldChange('description', e.target.value)}
          />
          <TextField
            label="Due Date"
            type="date"
            value={task.duedate ? formatDateForInput(task.duedate) : ''}
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
            onChange={(e) => handleFieldChange('duedate', e.target.value)}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Save Task
        </Button>
      </form>

      {/* Task Details Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Task Details
      </Typography>
      <Paper elevation={2} sx={{ padding: 2, bgcolor: '#E8F5E9' }}>
        <Typography variant="h6">{task.description}</Typography>
        <Typography variant="body2">Due Date: {getStandardDate(task.duedate)}</Typography>
        <Typography
          variant="body2"
          color={new Date(task.duedate) < new Date() ? 'red' : 'green'}
        >
          Status: {new Date(task.duedate) < new Date() ? 'Overdue' : 'On Time'}
        </Typography>
      </Paper>
    </Container>
  );
};

export default EditTask;