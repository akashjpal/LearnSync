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
import { alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { padding } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { getStandardDate } from '../helpers/getDate';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
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


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const MentorDashboard = () => {
  const navigate = useNavigate();
  const [mentor, setMentor] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState(new Map());
  const [open, setOpen] = useState(false);
  const [newProject,setNewProject] = useState({
    name:"",
    description:""
  })
  const [mentorid, setMentorId] = useState(0);
  const [updatePasswordVisibility, setUpdatePasswordVisibility] = useState(false);
  const [userDetail, setUserDetail] = useState({
      email: '',
      newPassword: '',
    });

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:3001/auth/update-password-mentor', {
        email: userDetail.email,
        password: userDetail.newPassword,
      });
      console.log(res);
      alert('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Error updating password');
    } finally {
      setUpdatePasswordVisibility(false);
    }
  }

  useEffect(() => {
    async function verifyUser() {
      try {
        const res = await axios.get(`http://localhost:3001/auth/verify-token`, { withCredentials: true });
        console.log(res.data);
        if (res.data.status === 200) {
          if (res.data.data.user.role === "mentor") {
            console.log(res.data.data.user.data);
            setMentorId(res.data.data.user.data.mentorid);
            setUserDetail({ email: res.data.data.user.data.email,newPassword:'' });
          }
        }else if (res.data.status === 401 || res.data.status === 404) {
          window.location.href = "/";
        }
      } catch (err) {
        console.error(err);
      }
    }
    verifyUser();
  }, []);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await axios.post('http://localhost:3001/projects/get-projects', {
          mentorid: mentorid,
        });
        console.log(response.data);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    fetchProjects();
  }, [open,mentorid]);

  useEffect(() => {
    async function fetchAllTasksAndStudents() {
      try {
        setLoading(true);
        const allTasks = [];
        const studentMap = new Map(); // Temporary map for batch updates

        for (const project of projects) {
          const response = await axios.post('http://localhost:3001/assign/get-tasks', {
            project_id: project.project_id,
          });
          allTasks.push(...response.data);

          // Fetch students for the tasks
          const studentResponses = await Promise.all(
            response.data.map((task) =>
              axios.post('http://localhost:3001/admin/get-student', {
                roll_no: task.student_roll_no,
              })
            )
          );

          studentResponses.forEach((studentResponse, index) => {
            const rollNumber = response.data[index].student_roll_no;
            studentMap.set(rollNumber, studentResponse.data);
          });
        }

        setTasks(allTasks);
        setStudents(studentMap); // Replace the state with a new Map
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks or students:', error);
      }
    }

    if (projects.length > 0) {
      fetchAllTasksAndStudents();
    }
  }, [projects,mentorid]);

  useEffect(() => {
    if (mentorid) {
      async function fetchMentor() {
        try {
          const response = await axios.post('http://localhost:3001/admin/get-mentor', {
            mentorid: mentorid,
          });
          console.log('Mentor Data:', response.data);
          setMentor(response.data);
        } catch (error) {
          console.error('Error fetching mentor:', error);
        }
      }
  
      fetchMentor();
    }
  }, [mentorid]);
  

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteProject = (project_id) => async () => {
    try {
      const res = await axios.post('http://localhost:3001/projects/delete-project', {
        project_id
      });
      console.log(res);
      setProjects((prev) => prev.filter((project) => project.project_id !== project_id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleSaveProject = async () =>{
    try{
      const res = await axios.post('http://localhost:3001/projects/add-project', {
        name: newProject.name,
        description: newProject.description,
        mentorid: mentorid
      });
      setNewProject({name:'',description:''})
      console.log(res);
    }catch(error){
      console.log(error);
    }finally{
      handleClose();
    }
  }


  const getStudents = (project_id) => {
    return tasks
      .filter((task) => task.project_id === project_id)
      .map((task, index) => {
        const student = students.get(task.student_roll_no);
        return (
          <Paper key={index} sx={{ padding: 2, mb: 2,  bgcolor: new Date(task.duedate) < new Date() ? alpha('#FF6347', 1) : alpha('#32CD32', 1), color: alpha('#FFF', 0.8), }}>
            <Typography variant="body2">
              <strong>Task Description: {task?.description || 'N/A'}</strong>
            </Typography>
            <Typography variant="body2">
              <strong>Status: {task?.status || 'N/A'}</strong>
            </Typography>
            <Typography variant='body2'>
              <strong>Assigned At: {getStandardDate(task?.assigned_at) || 'N/A'}</strong>
            </Typography>
            <Typography variant="body2">
              <strong>Student Name: {student?.name || 'N/A'}</strong>
            </Typography>
            <Typography variant="body2">Course: {student?.course || 'N/A'}</Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleSendNotification(student?.name || 'Student')}
              sx={{ mt: 1, width: '100%' }}
            >
              Send Notification
            </Button>
          </Paper>
        );
      });
  };

  const getCompleted = (project_id) => {
    const projectTasks = tasks.filter((task) => task.project_id === project_id);
    if (projectTasks.length === 0) return 0; // Avoid division by zero
  
    const completedTasks = projectTasks.filter((task) => task.status === 'completed');
    return (completedTasks.length / projectTasks.length) * 100;
  };  

  const handleSendNotification = (studentName) => {
    alert(`Notification sent to ${studentName}`);
  };

  const handleUpdatePasswordVisibility = () => {
    setUpdatePasswordVisibility(!updatePasswordVisibility);
  }

  return (
    <Container maxWidth="lg" sx={{ bgcolor: '#F5F7FA', py: 4 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar sx={{ width: 100, height: 100, bgcolor: 'grey.400' }}>M</Avatar>
        <Box sx={{ ml: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {mentor?.name || 'Mentor Name'}
          </Typography>
          <Typography variant="body1" color="#666">
            Department: {mentor?.department || 'Department not available'}
          </Typography>
        </Box>
      </Box>


      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={4} md={3}>
          <Paper elevation={3} sx={{ padding: 2, bgcolor: '#FFFFFF', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4A90E2' }}>Mentor Dashboard</Typography>
            <Divider sx={{ mb: 2 }} />
            <Button sx={{ width: '100%', justifyContent: 'flex-start', textTransform: 'none', color: '#333333' }} onClick={()=>handleUpdatePasswordVisibility()}>Update Password</Button>
            </Paper>
        </Grid>

        <Grid item xs={12} sm={8} md={9}>
          <Paper elevation={3} sx={{ padding: 3, bgcolor: '#FFFFFF' }}>
            <div style={{paddingBottom:'16px',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Projects</Typography>
            <Button variant="outlined" style={{padding:'0px 8px'}}  onClick={handleClickOpen}>
              Add Project
            </Button>
            </div>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <Paper key={index} sx={{ padding: 2, mb: 2, bgcolor: '#E3F2FD' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Title: {project.name}</Typography>
                  <Typography variant="body2">Description: {project.description}</Typography>
                  {
                    project.github_url ?
                  <Typography variant="body2">Github Link: <a target='_blank' href={`${project.github_url}`}>{project.name}</a></Typography>
                  :
                  <Typography variant="body2">Github Link: Not Available</Typography>
                  }
                  <Typography variant="body2">Progress: {getCompleted(project.project_id)}%</Typography>
                  <LinearProgress  variant="determinate" value={getCompleted(project.project_id)} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, mt: 4 }}>Taks Under Project</Typography>
                  {loading ? (
                    <Typography>Loading...</Typography>
                  ) : (
                    tasks.filter((task) => task.project_id === project.project_id).length > 0 ? (
                      getStudents(project.project_id)
                    ) : (
                      <Typography>No Tasks available</Typography>
                    )
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/manage-tasks/${project.project_id}`}
                    sx={{ mt: 3, width: '100%' }}
                  >
                    Manage All Tasks
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDeleteProject(project.project_id)}
                    sx={{ mt: 3, width: '100%' }}
                  >
                    Delete Project
                  </Button>
                </Paper>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">No projects available.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
      {/* Add Project Dialog */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add New Project
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <TextField
            fullWidth
            label="Project Name"
            name="name"
            variant="outlined"
            sx={{ mb: 2 }}
            value={newProject.name}
            onChange={(e) =>
              setNewProject((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
          <TextField
            fullWidth
            label="Project Description"
            name="description"
            variant="outlined"
            sx={{ mb: 2 }}
            value={newProject.description}
            onChange={(e) =>
              setNewProject((prev) => ({ ...prev, description: e.target.value }))
            }
            required
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleSaveProject();
            }}
          >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>

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

export default MentorDashboard;
