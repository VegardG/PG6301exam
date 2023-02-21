import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Activities(props) {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            const response = await axios.get(`http://localhost:5000/activities/${props.user.department}`);
            setActivities(response.data);
        }

        fetchActivities();
    }, [props.user]);

    return (
        <div>
            <h2>Activities</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Hours Logged</th>
                </tr>
                </thead>
                <tbody>
                {activities.map(activity => (
                    <tr key={activity._id}>
                        <td>{activity.name}</td>
                        <td>{activity.description}</td>
                        <td>{activity.hoursLogged}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Activities;
