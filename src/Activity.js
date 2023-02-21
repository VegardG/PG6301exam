import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Activity() {
    const [activities, setActivities] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    useEffect(() => {
        axios.get('/api/activities')
            .then(response => {
                setActivities(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submit logic here
    };

    return (
        <div>
            <h2>Log Activity</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Department:</label>
                    <select value={selectedDepartment} onChange={handleDepartmentChange}>
                        <option value="department1">Department 1</option>
                        <option value="department2">Department 2</option>
                        <option value="department3">Department 3</option>
                    </select>
                </div>
                <div>
                    {activities.filter(activity => activity.department === selectedDepartment)
                        .map(activity => (
                            <div key={activity._id}>
                                <input type="checkbox" value={activity._id} />
                                <label>{activity.name}</label>
                            </div>
                        ))}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Activity;
