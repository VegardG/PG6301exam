import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        console.log('Logging in');

        axios.post('http://localhost:8000/api/login', {
            username,
            password,
        })
            .then(response => {
                console.log(response.data);
                const { token, role } = response.data;
                localStorage.setItem('token', token);
                onLogin(token, role);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    };

    return (
        <div>
            <h2>Login</h2>
            <p>Log in with the username and password provided from your manager</p>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(event) => {
                        console.log('Updating username');
                        setUsername(event.target.value)} }/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(event) => {
                        console.log('Updating password');
                        setPassword(event.target.value)
                    }} />
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>

    );
}


export default Login;

