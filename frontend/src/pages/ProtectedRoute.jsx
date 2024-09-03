import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        // If no token found, redirect to the sign-in page
        return <Navigate to="/signin" replace />;
    }
    
    return children;
};

export default ProtectedRoute;