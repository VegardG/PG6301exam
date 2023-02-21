import React, {useState, useEffect} from 'react';
import axios from 'axios';

function EmployeeDashboard() {
    const [activity, setActivity] = useState('');
    const [hours, setHours] = useState('');
    const [totalHours, setTotalHours] = useState(0);

    useEffect(() => {
        axios.get('/api/hours')
            .then(response => {
                setTotalHours(response.data.totalHours);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = { activity, hours };
        const maxHours = 200;
        const newTotalHours = totalHours + parseInt(hours);
        if (newTotalHours <= maxHours) {
            axios.post('/api/hours', data)
                .then(response => {
                    setActivity('');
                    setHours('');
                    setTotalHours(newTotalHours);
                    alert('Hours logged successfully');
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            alert(`You can only log a maximum of ${maxHours} hours`);
        }
    }

    const handleLogout = () => {
        axios.post('/api/logout')
            .then(response => {
                window.location.href = '/';
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <h2>Log hours</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Activity:</label>
                    <select value={activity} onChange={(event) => setActivity(event.target.value)}>
                        <option value="">Select an activity</option>
                        <option value="Task A">Task A</option>
                        <option value="Task B">Task B</option>
                        <option value="Task C">Task C</option>
                        <option value="Task D">Task D</option>
                    </select>
                </div>
                <div>
                    <label>Hours</label>
                    <input type="number" value={hours} onChange={(event) => setHours(event.target.value)} />
                </div>
                <button type="submit">Submit</button>
            </form>

            <div>
                <h2>Total hours logged: {totalHours}</h2>
            </div>

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default EmployeeDashboard;