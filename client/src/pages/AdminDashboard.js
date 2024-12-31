import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Authecontext'; // Adjust the path based on your folder structure

const AdminDashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState({ type: '', id: null });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await axios.get(`http://localhost:3001/admin/get-all-students`);
        setStudents(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchMentors() {
      try {
        const res = await axios.get(`http://localhost:3001/admin/get-all-mentors`);
        setMentors(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchStudents();
    fetchMentors();
  }, [openDeleteDialog]);

  // Redirect if the user is not an admin or still loading
  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== 'admin') return <Navigate to="/" replace />;

 
  const handleDeleteDialogOpen = (type, id) => {
    setDeleteTarget({ type, id });
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (deleteTarget.type === 'student') {
        await axios.post(`http://localhost:3001/admin/delete-student`, { roll_no: deleteTarget.id });
      } else {
        await axios.post(`http://localhost:3001/admin/delete-mentor`, { mentorid: deleteTarget.id });
      }
      handleDeleteDialogClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, bgcolor: '#F5F7FA' }}>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={4} md={3}>
          <Paper elevation={3} sx={{ padding: 2, bgcolor: '#FFFFFF', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4A90E2' }}>
              Admin Dashboard
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Button
              component={Link}
              to="/student-dashboard"
              sx={{ width: '100%', justifyContent: 'flex-start', textTransform: 'none', color: '#333333' }}
            >
              Manage Students
            </Button>
            <Button
              component={Link}
              to="/mentor-dashboard"
              sx={{ width: '100%', justifyContent: 'flex-start', textTransform: 'none', color: '#333333' }}
            >
              Manage Mentors
            </Button>
            <Button
              component={Link}
              to="/manage-tasks"
              sx={{ width: '100%', justifyContent: 'flex-start', textTransform: 'none', color: '#333333' }}
            >
              Manage Tasks
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={9}>
          <Paper elevation={3} sx={{ padding: 3, bgcolor: '#FFFFFF' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h5">Students and Mentors Management</Typography>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Add />}
                  component={Link}
                  to="/admin/add-student"
                  sx={{ mr: 2 }}
                >
                  Add Student
                </Button>
                <Button variant="contained" color="secondary" startIcon={<Add />} component={Link} to="/admin/add-mentor">
                  Add Mentor
                </Button>
              </Box>
            </Box>

            {/* Students Table */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              Students List
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Course</TableCell>
                    <TableCell>Roll Number</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Password</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell>{student.roll_no}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.password}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" component={Link} to={`/admin/edit-student/${student.id}`}>
                          <Edit />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDeleteDialogOpen('student', student.roll_no)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Mentors Table */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 4 }}>
              Mentors List
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Mentor ID</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Password</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mentors.map((mentor, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{mentor.name}</TableCell>
                      <TableCell>{mentor.department}</TableCell>
                      <TableCell>{mentor.mentorid}</TableCell>
                      <TableCell>{mentor.email}</TableCell>
                      <TableCell>{mentor.password}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" component={Link} to={`/admin/edit-mentor/${mentor.mentorid}`}>
                          <Edit />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDeleteDialogOpen('mentor', mentor.mentorid)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Confirmation Dialog for Deletion */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this {deleteTarget.type}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
