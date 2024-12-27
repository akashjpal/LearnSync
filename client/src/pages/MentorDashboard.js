import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Avatar,
  Button,
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MentorDashboard = () => {
  const [students] = useState([
    { name: 'Pal Neha Awadhesh', course: 'MCA', rollNumber: '117', progress: '95%' },
    { name: 'Pal Neha Jiledar', course: 'MCA', rollNumber: '118', progress: '90%' },
  ]);

  const [project,setProject] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try{
        const response = await axios.post('http://localhost:3001/projects/get-projects',{mentorid: 1});
        const data = response.data;
        setProject(data);
      }catch(error){
        console.log(error);
      }
    }
    fetchData();
  },[]);

  async function addTask(){
    try{
      const response = await axios.post('http://localhost:3001/projects/add-project',{name: 'Project 1', description: 'Description 1', mentorid: 1});
      console.log(response.data);
    }catch(error){
      console.log(error);
    }
  }

  const handleSendNotification = (studentName) => {
    alert(`Notification sent to ${studentName}`);
  };

  return (
    <Container maxWidth="lg" sx={{ bgcolor: '#F5F7FA', py: 4 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar sx={{ width: 100, height: 100, bgcolor: 'grey.400' }}>M</Avatar>
        <Box sx={{ ml: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Mentor Name</Typography>
          <Typography variant="body1" color="#666">Your Role: Mentor</Typography>
        </Box>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={4} md={3}>
          <Paper elevation={3} sx={{ padding: 2, bgcolor: '#FFFFFF', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4A90E2' }}>Mentor Dashboard</Typography>
            <Divider sx={{ mb: 2 }} />
            <Button component={Link} to="/student-dashboard" sx={{ width: '100%', justifyContent: 'flex-start', textTransform: 'none', color: '#333333' }}>My Profile</Button>
            <Button component={Link} to="/students" sx={{ width: '100%', justifyContent: 'flex-start', textTransform: 'none', color: '#333333' }}>Students</Button>
            <Button component={Link} to="/account" sx={{ width: '100%', justifyContent: 'flex-start', textTransform: 'none', color: '#333333' }}>My Account</Button>
            <Button component={Link} to="/manage-tasks" sx={{ width: '100%', justifyContent: 'flex-start', textTransform: 'none', color: '#333333' }}>Manage Tasks</Button> {/* New Manage Tasks Button */}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={8} md={9}>
        <Paper elevation={3} sx={{ padding: 3, bgcolor: '#FFFFFF' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Students Under You</Typography>
            {students.map((student, index) => (
              <Paper key={index} sx={{ padding: 2, mb: 2, bgcolor: '#A3C1AD' }}>
                <Typography variant="body2"><strong>{student.name}</strong></Typography>
                <Typography variant="body2">Course: {student.course}</Typography>
                <Typography variant="body2">Roll Number: {student.rollNumber}</Typography>
                <Typography variant="body2">Progress: {student.progress}</Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleSendNotification(student.name)}
                  sx={{ mt: 1, width: '100%' }}
                >
                  Send Notification
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/edit-tasks/${student.rollNumber}`} // Ensure this routes to the right edit task page
                  sx={{ mt: 1, width: '100%' }}
                >
                  Edit Tasks
                </Button>
              </Paper>
            ))}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Notifications</Typography>
            <Paper sx={{ padding: 2, bgcolor: '#FF6B6B' }}>
              <Typography variant="body2" color="#fff">New students assigned to you!</Typography>
            </Paper>
            {/* Button for managing all tasks */}
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/manage-tasks" // A route for bulk editing tasks if needed
              sx={{ mt: 3, width: '100%' }}
            >
              Manage All Tasks
            </Button>
          </Paper>
          <Paper elevation={3} sx={{ padding: 3, bgcolor: '#FFFFFF' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Projects Under You</Typography>
            {project.map((project, index) => (
              <Paper key={index} sx={{ padding: 2, mb: 2, bgcolor: '#A3C1AD' }}>
                <Typography variant="body2"><strong>{project.name}</strong></Typography>
                <Typography variant="body2">Course: {project.description}</Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleSendNotification(project.name)}
                  sx={{ mt: 1, width: '100%' }}
                >
                  Send Notification
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  click = "()=>addTask()"
                  sx={{ mt: 1, width: '100%' }}
                >
                  Add Tasks
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/edit-tasks/${project.rollNumber}`} // Ensure this routes to the right edit task page
                  sx={{ mt: 1, width: '100%' }}
                >
                  Edit Projects
                </Button>
              </Paper>
            ))}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Notifications</Typography>
            <Paper sx={{ padding: 2, bgcolor: '#FF6B6B' }}>
              <Typography variant="body2" color="#fff">New students assigned to you!</Typography>
            </Paper>
            {/* Button for managing all tasks */}
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/manage-tasks" // A route for bulk editing tasks if needed
              sx={{ mt: 3, width: '100%' }}
            >
              Manage All Tasks
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MentorDashboard;
