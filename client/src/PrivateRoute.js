import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './Authecontext';

const PrivateRoute = ({ children, role }) => {
    const { user, loading } = useContext(AuthContext);
  
    console.log('PrivateRoute - User:', user);
    console.log('PrivateRoute - Role:', role);
    console.log('PrivateRoute - Loading:', loading);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!user || (role && user.role !== role)) {
      console.log('PrivateRoute - Unauthorized or Not Logged In');
      return <Navigate to="/" replace />;
    }
  
    return children;
  };
  

export default PrivateRoute;
