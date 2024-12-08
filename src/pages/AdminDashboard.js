import React, { useState } from 'react';
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
import { Edit, Delete, Visibility, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Pal Neha Awadhesh', course: 'MCA', rollNumber: '117' },
    { id: 2, name: 'Pal Neha Jiledar', course: 'MCA', rollNumber: '118' },
  ]);

  const [mentors, setMentors] = useState([
    { id: 1, name: 'Mentor 1', assignedStudents: 2 },
    { id: 2, name: 'Mentor 2', assignedStudents: 3 },
  ]);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ type: '', id: null });

  const handleDeleteDialogOpen = (type, id) => {
    setDeleteTarget({ type, id });
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget.type === 'student') {
      setStudents(students.filter(student => student.id !== deleteTarget.id));
    } else if (deleteTarget.type === 'mentor') {
      setMentors(mentors.filter(mentor => mentor.id !== deleteTarget.id));
    }
    handleDeleteDialogClose();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, bgcolor: '#F5F7FA' }}>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={4} md={3}>
          <Paper elevation={3} sx={{ padding: 2, bgcolor: '#FFFFFF', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4A90E2' }}>Admin Dashboard</Typography>
            <Divider sx={{ mb: 2 }} />
            <Button component={Link} to="/student-dashboard" sx={{ width: '100%', justifyContent: 'flex-start', textTransform: 'none', color: '#333333' }}>Manage Students</Button>
            <Button component={Link} to="/courses" sx={{ width: '100%', justifyContent: 'flex-start', textTransform: 'none', color: '#333333' }}>Manage Mentors</Button>
            <Button component={Link} to="/account" sx={{ width: '100%', justifyContent: 'flex-start', textTransform: 'none', color: '#333333' }}>Manage Tasks</Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={9}>
          <Paper elevation={3} sx={{ padding: 3, bgcolor: '#FFFFFF' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h5">Students and Mentors Management</Typography>
              <Box>
                <Button variant="contained" color="primary" startIcon={<Add />} component={Link} to="/admin/add-student" sx={{ mr: 2 }}>
                  Add Student
                </Button>
                <Button variant="contained" color="secondary" startIcon={<Add />} component={Link} to="/admin/add-mentor">
                  Add Mentor
                </Button>
              </Box>
            </Box>

            {/* Students Table */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Students List</Typography>
            <Divider sx={{ mb: 2 }} />
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Course</TableCell>
                    <TableCell>Roll Number</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell>{student.rollNumber}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" component={Link} to={`/admin/edit-student/${student.id}`}>
                          <Edit />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDeleteDialogOpen('student', student.id)}>
                          <Delete />
                        </IconButton>
                        <IconButton color="inherit" component={Link} to={`/admin/view-student/${student.id}`}>
                          <Visibility />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Mentors Table */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 4 }}>Mentors List</Typography>
            <Divider sx={{ mb: 2 }} />
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Assigned Students</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mentors.map((mentor) => (
                    <TableRow key={mentor.id}>
                      <TableCell>{mentor.id}</TableCell>
                      <TableCell>{mentor.name}</TableCell>
                      <TableCell>{mentor.assignedStudents}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" component={Link} to={`/admin/edit-mentor/${mentor.id}`}>
                          <Edit />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDeleteDialogOpen('mentor', mentor.id)}>
                          <Delete />
                        </IconButton>
                        <IconButton color="inherit" component={Link} to={`/admin/view-mentor/${mentor.id}`}>
                          <Visibility />
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
          <Button onClick={handleDeleteDialogClose} color="primary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
