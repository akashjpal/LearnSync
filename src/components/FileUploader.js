// src/components/FileUploader.js
import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import axios from 'axios';

function FileUploader() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('File uploaded successfully');
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Box>
      <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="file-input" />
      <label htmlFor="file-input">
        <Button variant="contained" component="span">Choose File</Button>
      </label>
      <Button variant="contained" onClick={handleUpload} sx={{ ml: 2 }}>Upload</Button>
    </Box>
  );
}

export default FileUploader;
