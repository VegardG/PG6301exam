import React from 'react';
//import Login from './login'

function EmployeeDashboard() {
    return (
        <div>
            <h1>Employee Dashboard</h1>

            <div>
                <label>Department:</label>
                <select>
                    <option value="accounting"> Accounting</option>
                    <option value="developers"> Developers</option>
                    <option value="sales"> Sales</option>
                </select>
            </div>
        </div>
    );
}

export default EmployeeDashboard;