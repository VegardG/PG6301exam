import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login';
import ManagerDashboard from './managerdashboard';
import EmployeeDashboard from './employeedashboard';
import Home from "./Homepage";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true);
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUserRole(decodedToken.role);
        }
    }, []);

    const handleLogin = (token, role) => {
        //console.log("handleLogin",token, role);
        localStorage.setItem('token', token);
        setLoggedIn(true);
        setUserRole(role);
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        setUserRole('');
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route
                    path="/dashboard"
                    element={
                        loggedIn && userRole === 'manager' ? (
                            <ManagerDashboard onLogout={handleLogout} />
                        ) : loggedIn && userRole === 'employee' ? (
                            <EmployeeDashboard onLogout={handleLogout} />
                        ) : (
                            <Navigate replace to="/login" />
                        )
                    }
                />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;


