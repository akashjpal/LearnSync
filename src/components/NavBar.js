// src/components/NavBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <div>
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
            <MenuItem component={Link} to="/student-dashboard" onClick={handleClose}>
              Student Dashboard
            </MenuItem>
            <MenuItem component={Link} to="/mentor-dashboard" onClick={handleClose}>
              Mentor Dashboard
            </MenuItem>
            <MenuItem component={Link} to="/admin-dashboard" onClick={handleClose}>
              Admin Dashboard
            </MenuItem>
          </Menu>
        </div>
        <Button
          component={Link}
          to="/auth" // Ensure this route exists in your App.js
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
          LOGIN/SIGNUP
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
