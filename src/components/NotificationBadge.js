// src/components/NotificationBadge.js
import React, { useEffect, useState } from 'react';
import { Typography, Badge, Box } from '@mui/material';
import axios from 'axios';

function NotificationBadge() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications/unread-count'); // Adjust endpoint if necessary
        setUnreadCount(response.data.count);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <Box sx={{ my: 3 }}>
      <Badge badgeContent={unreadCount} color="primary">
        <Typography variant="h6">Notifications</Typography>
      </Badge>
    </Box>
  );
}

export default NotificationBadge;
