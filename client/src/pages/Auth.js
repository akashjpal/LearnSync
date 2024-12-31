import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    let isMounted = true; // Track component mounting

    async function verifyUser() {
      try {
        const res = await axios.get(`http://localhost:3001/auth/verify-token`, { withCredentials: true });
        if (isMounted && res.data.status === 200) {
          redirectToDashboard(res.data.data.user.role); // Redirect based on role
        }
      } catch (err) {
        console.error('Error verifying user:', err);
      }
    }

    verifyUser();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, [navigate]);

  const redirectToDashboard = (role) => {
    if (role === 'student') {
      navigate('/student-dashboard', { replace: true });
    } else if (role === 'mentor') {
      navigate('/mentor-dashboard', { replace: true });
    } else if (role === 'admin') {
      navigate('/admin-dashboard', { replace: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:3001/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log(res);

      if (res.status === 200) {
        console.log('Login successful:', res.data);
        window.location.reload();
      } else {
        console.error('Login failed:', res.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {isLogin ? 'Login' : 'Signup'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email Address"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            {isLogin ? 'Login' : 'Signup'}
          </Button>
          <Button onClick={() => setIsLogin((prev) => !prev)}>
            {isLogin ? 'Need an account? Signup' : 'Already have an account? Login'}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Auth;
