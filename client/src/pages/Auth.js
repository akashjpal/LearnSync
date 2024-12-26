// src/pages/Auth.js
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
    async function verifyUser() {
      try {
        const res = await axios.get(`http://localhost:3001/auth/verify-token`, { withCredentials: true });
        console.log(res.data);
        if (res.data.status === 200) {
          if (res.data.data.user.userrole === "student") {
            navigate("/student-dashboard");
          } else if (res.data.data.user.userrole === "mentor") {
            navigate("/mentor-dashboard");
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    verifyUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login or signup logic here
    console.log(`Email: ${email}, Password: ${password}, Is Login: ${isLogin}`);
    // Reset fields after submit
    try {
      const res = await axios.post(`http://localhost:3001/auth/login`, {
        email,
        password
      }, { withCredentials: true });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

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
