import React, { useState, useEffect } from 'react';

function ManagerDashboard() {
    const [employees, setEmployees] = useState([]);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newDepartment, setNewDepartment] = useState('');


    useEffect(() => {
        const loadEmployees = async () => {
            const response = await fetch('http://localhost:8000/employees');
            const data = await response.json();
            setEmployees(data);
        };
        loadEmployees();
    }, []);

    const handleCreateEmployee = async (event) => {
        event.preventDefault();
        await fetch('http://localhost:8000/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: newUsername,
                password: newPassword,
                department: newDepartment,
                role: 'employee'
            })
        });
        setEmployees([...employees, { username: newUsername, department: newDepartment }]);
        setNewUsername('');
        setNewPassword('');
        setNewDepartment('');
    };

    const handleDeleteEmployee = async (username) => {
        await fetch(`http://localhost:8000/employees/${username}`, {
            method: 'DELETE'
    });
        setEmployees(employees.filter((employee) => employee.username !== username));
    };

    return (
        <div>
            <h2>Employee list</h2>
            <table>
                <thread>
                    <tr>
                        <th>Username</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thread>
                <tbody>
                    {employees.map((employee) => (
                    <tr key={employee.username}>
                        <td>{employee.username}</td>
                        <td>{employee.department}</td>
                        <td>
                            <button onClick={() => handleDeleteEmployee(employee.username)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <h2>Create Employee</h2>
            <form onSubmit={handleCreateEmployee}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={newUsername} onChange={(event) => setNewUsername(event.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={newPassword} onChange ={(event) => setNewPassword(event.target.value)} />
                </div>
                <div>
                    <label>Department</label>
                    <input type="text" value={newDepartment} onChange={(event) => setNewDepartment(event.target.value)} />
                </div>
                <button type="submit">Create Employee</button>
            </form>
        </div>
    );
}

export default ManagerDashboard;