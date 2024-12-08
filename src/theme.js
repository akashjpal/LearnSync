// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6F00', // Orange color
      contrastText: '#FFFFFF', // White text for buttons and elements with primary color
    },
    background: {
      default: '#FFFFFF', // White background
    },
    text: {
      primary: '#333333', // Darker text color for readability
      secondary: '#FF6F00', // Orange for secondary text, if needed
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

export default theme;
