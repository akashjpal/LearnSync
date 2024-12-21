import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Modal,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ManageTasks = () => {
  // Sample data for tasks
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project proposal', assignedTo: 'Pal Neha Awadhesh', deadline: '2024-11-15' },
    { id: 2, title: 'Implement feature X', assignedTo: 'Pal Neha Jiledar', deadline: '2024-11-20' },
  ]);

  // List of students
  const [students] = useState([
    { id: 1, name: 'Pal Neha Awadhesh' },
    { id: 2, name: 'Pal Neha Jiledar' },
    { id: 3, name: 'Student Three' },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', assignedTo: '', deadline: '' });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleAddTask = () => {
    if (!newTask.title || !newTask.assignedTo || !newTask.deadline) {
      alert('Please fill in all fields');
      return;
    }

    const id = tasks.length ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
    setTasks([...tasks, { ...newTask, id }]);
    setNewTask({ title: '', assignedTo: '', deadline: '' });
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleEditTask = (id) => {
    alert(`Edit task with ID: ${id}`);
  };

  const handleDeleteTask = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Manage Tasks</Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Task Management</Typography>
        <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleOpenModal}>
          Add New Task
        </Button>
        
        {/* Tasks Table */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Task Title</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.assignedTo}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ mr: 1 }}>{task.deadline}</Typography>
                    <Box
                      sx={{
                        width: '50px',
                        height: '5px',
                        borderRadius: '5px',
                        backgroundColor: new Date(task.deadline) < new Date() ? 'red' : 'green',
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleEditTask(task.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteTask(task.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Modal for Adding New Task */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" gutterBottom>Add New Task</Typography>
          <TextField
            fullWidth
            label="Task Title"
            name="title"
            variant="outlined"
            sx={{ mb: 2 }}
            value={newTask.title}
            onChange={handleInputChange}
            required
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Assigned To</InputLabel>
            <Select
              name="assignedTo"
              value={newTask.assignedTo}
              onChange={handleInputChange}
              required
            >
              {students.map(student => (
                <MenuItem key={student.id} value={student.name}>
                  {student.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Deadline"
            name="deadline"
            variant="outlined"
            type="date"
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
            value={newTask.deadline}
            onChange={handleInputChange}
            required
          />
          <Button variant="contained" color="primary" onClick={handleAddTask}>
            Save Task
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default ManageTasks;
