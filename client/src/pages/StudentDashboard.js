import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Box,
  Avatar,
  Button,
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getStandardDate } from '../helpers/getDate';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StudentDashboard = () => {
  
  const navigate = useNavigate();
  const [updatedProject, setUpdatedProject] = useState({
    name: '',
    description: '',
    github_url: '',
  });

  const student = {
    name: 'Pal Neha Jiledar',
    photo: `${process.env.PUBLIC_URL}/student-photo.jpg`,
    github: 'https://github.com/username',
    course: 'MCA',
    rollNumber: '118',
    semester: 'First Semester',
  };
  

  const mentor = { name: 'Mentor Name', photo: `${process.env.PUBLIC_URL}/mentor-photo.jpg` };

  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mentorName, setMentorName] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [project, setProject] = useState();
  const [roll_no, setRollNo] = useState();
  const [userFound, setUserFound] = useState(false);
  const [updatePasswordVisibility, setUpdatePasswordVisibility] = useState(false);
  const [userDetail, setUserDetail] = useState({
    email: '',
    newPassword: '',
  });

  useEffect(() => {
    async function verifyUser() {
      try {
        setUserFound(false);
        const res = await axios.get(`http://localhost:3001/auth/verify-token`, { withCredentials: true });
        console.log(res.data);
        if (res.data.status === 200) {
          console.log(res.data.data.user);
          // console.log("Roll No",res.data.data.user.data.roll_no);
          setRollNo(res.data.data.user.data.roll_no);
          setUserDetail({
            email: res.data.data.user.data.email,
            newPassword: '',
          });
        }else if(res.data.status === 401 || res.data.status === 404){
          window.location.href = "/";
        }
      } catch (err) {
        console.error(err);
      }finally{
        setUserFound(true);
      }
    }
    verifyUser();
  }, []);


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post(`http://localhost:3001/assign/get-students-tasks`, { roll_no: roll_no });
        console.log(res.data);
        setTasks(res.data);
        const initialStatus = res.data.map((task) => ({
          task_id: task.task_id,
          status: task.status,
        }));
        setStatus(initialStatus);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchStudent() {
      try {
        const res = await axios.post(`http://localhost:3001/admin/get-student`, { roll_no: roll_no });
        console.log(res);
        setStudents(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      if(roll_no){
      setLoading(true);
      fetchData();
      fetchStudent();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [roll_no]);

  useEffect(() => {
    async function fetchMentorName() {
      if (students.mentorid) {
        try {
          console.log(students.mentorid);
          const res = await axios.post(`http://localhost:3001/admin/get-mentor`, { mentorid: students.mentorid });
          setMentorName(res.data.name);
        } catch (error) {
          console.error('Error fetching mentor name:', error);
        }
      }
    }

    fetchMentorName();
  }, [students,roll_no]);

  useEffect(() => {
    async function fetchProjects(project_id) {
      try {
        const res = await axios.post(`http://localhost:3001/projects/get-project-with-id`,{project_id:project_id});
        setProject(res.data);
        setUpdatedProject({
          name: res.data.name,
          description: res.data.description,
          github_url: res.data.github_url,
        });
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }
    if(tasks.length > 0){
      console.log(tasks);
      fetchProjects(tasks[0].project_id);
    }
  },[tasks,roll_no]);

  async function githubLinkUpload(project_id) {
    try {
      const res = await axios.post(`http://localhost:3001/projects/add-github-link`, {
        project_id: project_id,
        name: updatedProject.name,
        description: updatedProject.description,
        github_url: updatedProject.github_url,
      });
      alert('Project Updated Successfully');
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdatePasswordVisibility = () =>{
    setUpdatePasswordVisibility(!updatePasswordVisibility);
  }

  const getTaskStatus = (task_id) => {
    const task = status.find((task) => task.task_id === task_id);
    return task ? task.status : 'N/A';
  };

  const handleChange = async (task_id, value) => {
    try {
      console.log(task_id, value);
      setStatus((prev) =>
        prev.map((task) =>
          task.task_id === task_id ? { ...task, status: value } : task
        )
      );

      const res = await axios.post(`http://localhost:3001/assign/task-status-update`, {
        task_id: task_id,
        status: value,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  if(!userFound){
    return <div>Loading...</div>
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:3001/auth/update-password`, {
        email: userDetail.email,
        password: userDetail.newPassword,
      });
      console.log(res);
      alert('Password Updated Successfully');
      setUserDetail({
        email: '',
        newPassword: '',
      });
      setUpdatePasswordVisibility(false);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <Container maxWidth="lg" sx={{ bgcolor: '#F5F7FA', py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar src={student.photo} alt={student.name} sx={{ width: 100, height: 100, border: '2px solid #4A90E2' }} />
        <Box sx={{ ml: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{students.name}</Typography>
          <Typography variant="body2" color="#666">{students.course}</Typography>
          <Typography variant="body2" color="#666">Roll Number: {students.roll_no}</Typography>
          <Typography variant="body2" color="#666">Mentor: {mentorName || 'N/A'}</Typography>
        </Box>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={4} md={3}>
          <Paper elevation={3} sx={{ padding: 2, bgcolor: '#FFFFFF', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4A90E2' }}>Student Dashboard</Typography>
            <Divider sx={{ mb: 2 }} />
            <Button onClick={()=>handleUpdatePasswordVisibility()} sx={{ width: '100%', textTransform: 'none', color: '#333333' }}>Update Password</Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={8} md={9}>
          <Paper elevation={3} sx={{ padding: 3, bgcolor: '#FFFFFF', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Assigned Tasks</Typography>
            {tasks.map((task, index) => (
              <Paper key={index} sx={{ padding: 2, mb: 2, bgcolor: '#A3C1AD', borderRadius: 1 }}>
                <Typography variant="body2"><strong>{task.description}</strong></Typography>
                <Typography variant="body2">Due Date: {getStandardDate(task.duedate)}</Typography>
                <FormControl fullWidth sx={{ mt: 2, width: '50%' }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={getTaskStatus(task.task_id)}
                    onChange={(event) => handleChange(task.task_id, event.target.value)}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="suggestion-needed">Need a Suggestion</MenuItem>
                  </Select>
                </FormControl>
              </Paper>
            ))}
            {tasks.length === 0 && <Typography variant="body2" sx={{ mb: 2 }}>No tasks assigned yet!</Typography>}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Notifications</Typography>
            <Paper sx={{ padding: 2, bgcolor: '#FF6B6B', borderRadius: 1 }}>
              <Typography variant="body2" color="#fff">Project deadline approaching</Typography>
            </Paper>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>Update Project Details</Typography>
            {project && (
              <Paper sx={{ padding: 2, mb: 2, bgcolor: '#A3C1AD', borderRadius: 1 }}>
                <TextField
                  fullWidth
                  label="Project Title"
                  value={updatedProject.name}
                  onChange={(e) => setUpdatedProject((project)=>({ ...project, name: e.target.value }))}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Project Description"
                  value={updatedProject.description}
                  onChange={(e) => setUpdatedProject((project)=>({ ...project, description: e.target.value }))}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Github Link"
                  value={updatedProject.github_url}
                  onChange={(e) => setUpdatedProject((project)=>({ ...project, github_url: e.target.value}))}
                  sx={{ mt: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => githubLinkUpload(project.project_id)}
                  sx={{ mt: 2 }}
                >
                  Update Project
                </Button>
              </Paper>
            )}

          </Paper>
        </Grid>
      </Grid>
      
      <Dialog
        fullScreen
        open={updatePasswordVisibility}
        onClose={handleUpdatePasswordVisibility}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleUpdatePasswordVisibility}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Update Password
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          type='email'
          value={userDetail.email}
          required
          disabled
        />
        <TextField
          fullWidth
          label="New Password"
          type="password"
          margin="normal"
          value={userDetail.newPassword}
          onChange={(e) => setUserDetail({ ...userDetail, newPassword: e.target.value })}
          required
        />
      </Dialog>

    </Container>
  );
};

export default StudentDashboard;
