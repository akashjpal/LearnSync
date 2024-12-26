import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMentor = ({ students = [], onAddMentor }) => {
  const navigate = useNavigate();
  const [mentor, setMentor] = useState({
    mentorId: '',
    name: '',
    department: '',
    email: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const res = await axios.post(`http://localhost:3001/admin/add-mentor`, {mentorId: mentor.mentorId, name: mentor.name, department: mentor.department, email: mentor.email});
      console.log(res);
      navigate("/admin-dashboard");
    }catch(error){
      console.log(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Add New Mentor</Typography>
        <form onSubmit={handleSubmit}>
        <TextField
            fullWidth
            label="Mentor Id"
            variant="outlined"
            type='number'
            value={mentor.mentorId}
            onChange={(e) => setMentor({ ...mentor, mentorId: e.target.value })}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Mentor Name"
            variant="outlined"
            value={mentor.name}
            onChange={(e) => setMentor({ ...mentor, name: e.target.value })}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Mentor Department"
            variant="outlined"
            value={mentor.department}
            onChange={(e) => setMentor({ ...mentor, department: e.target.value })}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Mentor Email"
            variant="outlined"
            value={mentor.email}
            type='email'
            onChange={(e) => setMentor({ ...mentor, email: e.target.value })}
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" onSubmit={()=>handleSubmit()}>
            Add Mentor
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddMentor;
