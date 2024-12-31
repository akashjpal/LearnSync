import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Authecontext';
import axios from 'axios';

const NavBar = () => {
  const { user, setUser } = useContext(AuthContext); // Use AuthContext for user state
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3001/auth/logout', { withCredentials: true });
      setUser(null); // Reset user in AuthContext
      navigate('/auth', { replace: true }); // Redirect to login
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#4A90E2', boxShadow: 'none' }}>
      <Toolbar>
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="Logo"
          style={{ height: '50px', marginRight: '20px' }}
        />
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'white' }}>
          LearnSync
        </Typography>

        {user ? (
          <>
            {/* Dashboard Menu */}
            <Button
              aria-controls="dashboards-menu"
              aria-haspopup="true"
              onClick={handleClick}
              sx={{
                color: 'white',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle hover effect
                },
              }}
            >
              Dashboards
            </Button>
            <Menu
              id="dashboards-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {user.role === 'student' && (
                <MenuItem component={Link} to="/student-dashboard" onClick={handleClose}>
                  Student Dashboard
                </MenuItem>
              )}
              {user.role === 'mentor' && (
                <MenuItem component={Link} to="/mentor-dashboard" onClick={handleClose}>
                  Mentor Dashboard
                </MenuItem>
              )}
              {user.role === 'admin' && (
                <MenuItem component={Link} to="/admin-dashboard" onClick={handleClose}>
                  Admin Dashboard
                </MenuItem>
              )}
            </Menu>

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              sx={{
                color: 'white',
                ml: 2,
                border: '1px solid white',
                borderRadius: '20px',
                padding: '8px 16px',
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)', // Change on hover
                  border: '1px solid #4A90E2',
                },
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          // Login Button for unauthenticated users
          <Button
            component={Link}
            to="/auth"
            sx={{
              color: 'white',
              ml: 2,
              border: '1px solid white',
              borderRadius: '20px',
              padding: '8px 16px',
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)', // Change on hover
                border: '1px solid #4A90E2',
              },
            }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
