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

const AddMentor = ({ students = [], onAddMentor }) => {
  const [mentorName, setMentorName] = useState('');
  const [assignedStudents, setAssignedStudents] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!mentorName) {
      alert("Please enter the mentor's name");
      return;
    }

    // Create a new mentor object
    const newMentor = {
      id: Date.now(), // Unique ID for the mentor
      name: mentorName,
      assignedStudents: assignedStudents.length, // Number of assigned students
      studentIds: assignedStudents, // List of assigned student IDs
    };

    if (onAddMentor) {
      onAddMentor(newMentor); // Call function to add the mentor if provided
    }
    setMentorName('');
    setAssignedStudents([]);
  };

  const handleStudentChange = (event) => {
    setAssignedStudents(event.target.value);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Add New Mentor</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Mentor Name"
            variant="outlined"
            value={mentorName}
            onChange={(e) => setMentorName(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel id="assigned-students-label">Assigned Students</InputLabel>
            <Select
              labelId="assigned-students-label"
              label="Assigned Students"
              multiple
              value={assignedStudents}
              onChange={handleStudentChange}
              renderValue={(selected) =>
                selected
                  .map((id) => {
                    const student = students.find((s) => s.id === id);
                    return student ? student.name : id;
                  })
                  .join(', ')
              }
            >
              {students.map((student) => (
                <MenuItem key={student.id} value={student.id}>
                  {student.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Add Mentor
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddMentor;
