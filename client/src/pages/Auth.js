// src/pages/Auth.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login or signup logic here
    console.log(`Email: ${email}, Password: ${password}, Is Login: ${isLogin}`);
    // Reset fields after submit
    setEmail('');
    setPassword('');
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
