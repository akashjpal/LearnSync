// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <Grid container spacing={2}>
      {tasks.map((task) => (
        <Grid item xs={12} key={task.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{task.title}</Typography>
              <Typography color="textSecondary">Deadline: {task.deadline}</Typography>
              <Typography>Status: {task.status}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default TaskList;
