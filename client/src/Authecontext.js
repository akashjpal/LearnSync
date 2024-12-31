import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const AuthContext = createContext();

// Create the provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // To store user details
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    // Function to verify the user
    const verifyUser = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/verify-token', { withCredentials: true });
        if (response.data.status === 200) {
          setUser(response.data.data.user); // Set the user if verified
        } else {
          setUser(null); // Reset user if verification fails
        }
      } catch (error) {
        console.error('Error verifying user:', error);
        setUser(null);
      } finally {
        setLoading(false); // Stop loading once verification is done
      }
    };

    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
