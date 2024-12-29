import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ManageTasks = () => {
  const { id } = useParams(); // Extract project_id from URL
  console.log(id);
  const [tasks, setTasks] = useState([]);
  const [students] = useState([
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [newTask, setNewTask] = useState({ student_roll_no: '', description: '' ,duedate:null});

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post('http://localhost:3001/assign/get-tasks', { project_id: id });
        const data = response.data;

        if (!data || data.length === 0) {
          setTasks([]);
          return;
        }
        console.log(data);
        const newArray = data.map((task,index) => ({
          id: index+1,
          task_id: task.task_id,
          description: task.description,
          student_roll_no: task.student_roll_no,
          duedate: task.duedate
        }));
        setTasks(newArray);
        console.log("set modeule",newArray);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    fetchData();
  }, [openModal]);

  const handleAddTask = async () => {
    if (!newTask.description || !newTask.student_roll_no) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3001/assign/add-task', {
        project_id: id,
        description: newTask.description,
        student_roll_no: newTask.student_roll_no,
        duedate: newTask.duedate
      });
      console.log('Task added:', res.data);

      setNewTask({ student_roll_no: '', description: '' });
      handleCloseModal();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditTask = (id) => {
    alert(`Edit task with ID: ${id}`);
  };

  // check deletion logic
  const handleDeleteTask = async (task_id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      try {
        await axios.post('http://localhost:3001/assign/delete-task', { task_id: task_id });
        setTasks((prevTasks) => prevTasks.filter((task) => task.task_id !== task_id));
        console.log(`Task with ID ${task_id} deleted.`);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Tasks
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Task Management
        </Typography>
        <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleOpenModal}>
          Add New Task
        </Button>

        {/* Tasks Table */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Student Roll No</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, index) => (
              <TableRow key={task.student_roll_no + index}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.student_roll_no}</TableCell>
                <TableCell>{task.duedate}</TableCell>
                <TableCell>
                <Typography variant="body2" color={new Date(task.duedate) < new Date() ? 'red' : 'green'}>
                  {new Date(task.duedate) < new Date() ? 'Overdue' : 'On Time'}
                </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleEditTask(task.task_id)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteTask(task.task_id)}>
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
          <Typography variant="h6" gutterBottom>
            Add New Task
          </Typography>
          <TextField
            fullWidth
            label="Description"
            name="description"
            variant="outlined"
            sx={{ mb: 2 }}
            value={newTask.description}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            label="Student Roll no"
            name="student_roll_no"
            variant="outlined"
            type="number"
            sx={{ mb: 2 }}
            value={newTask.student_roll_no}
            onChange={handleInputChange}
            required
          />
         
         <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="duedate"
            value={newTask.duedate} // Bind the value to the state
            onChange={(newValue) => {
              setNewTask((prev) => ({ ...prev, duedate: newValue })); // Update the state with the selected date
            }}
            renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
          />
        </LocalizationProvider>

          <Button variant="contained" color="primary" onClick={handleAddTask}>
            Save Task
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default ManageTasks;
