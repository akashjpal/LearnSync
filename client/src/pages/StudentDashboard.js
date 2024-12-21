import React from 'react';
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

const StudentDashboard = () => {
  const student = {
    name: 'Pal Neha Jiledar',
    photo: `${process.env.PUBLIC_URL}/student-photo.jpg`,
    github: 'https://github.com/username',
    course: 'MCA',
    rollNumber: '118',
    semester: 'First Semester',
  };

  const mentor = { name: 'Mentor Name', photo: `${process.env.PUBLIC_URL}/mentor-photo.jpg` };

  const tasks = [
    { id: 1, title: 'Complete the project proposal', dueDate: '2024-11-10' },
    { id: 2, title: 'Implement feature X', dueDate: '2024-11-15' },
  ];

  return (
    <Container maxWidth="lg" sx={{ bgcolor: '#F5F7FA', py: 4 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar src={student.photo} alt={student.name} sx={{ width: 100, height: 100, border: '2px solid #4A90E2' }} />
        <Box sx={{ ml: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{student.name}</Typography>
          <Typography variant="body2" color="#666">{student.course}</Typography>
          <Typography variant="body2" color="#666">Roll Number: {student.rollNumber}</Typography>
          <Typography variant="body2" color="#666">Semester: {student.semester}</Typography>
          <Typography variant="body2" color="#666">Mentor: {mentor.name}</Typography>
        </Box>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={4} md={3}>
          <Paper elevation={3} sx={{ padding: 2, bgcolor: '#FFFFFF', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4A90E2' }}>Student Dashboard</Typography>
            <Divider sx={{ mb: 2 }} />
            <Button component={Link} to="/student-dashboard" sx={{ width: '100%', justifyContent: 'flex-start', textTransform: 'none', color: '#333333' }}>My Profile</Button>
            <Button component={Link} to="/courses" sx={{ width: '100%', justifyContent: 'flex-start', textTransform: 'none', color: '#333333' }}>Enrolled Courses</Button>
            <Button component={Link} to="/account" sx={{ width: '100%', justifyContent: 'flex-start', textTransform: 'none', color: '#333333' }}>My Account</Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={8} md={9}>
          <Paper elevation={3} sx={{ padding: 3, bgcolor: '#FFFFFF', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Assigned Tasks</Typography>
            {tasks.map((task) => (
              <Paper key={task.id} sx={{ padding: 2, mb: 2, bgcolor: '#A3C1AD', borderRadius: 1 }}>
                <Typography variant="body2"><strong>{task.title}</strong></Typography>
                <Typography variant="body2">Due Date: {task.dueDate}</Typography>
                <Typography variant="body2" color={new Date(task.dueDate) < new Date() ? 'red' : 'green'}>
                  Status: {new Date(task.dueDate) < new Date() ? 'Overdue' : 'On Time'}
                </Typography>
              </Paper>
            ))}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Notifications</Typography>
            <Paper sx={{ padding: 2, bgcolor: '#FF6B6B', borderRadius: 1 }}>
              <Typography variant="body2" color="#fff">Project deadline approaching</Typography>
            </Paper>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>Update Project</Typography>
            <Button
              variant="contained"
              color="error"
              href={student.github}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: 1, width: '100%' }}
            >
              VIEW ON GITHUB
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentDashboard;
