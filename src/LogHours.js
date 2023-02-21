import React, { useState } from 'react';

function LogHours() {
    const [activity, setActivity] = useState('');
    const [hours, setHours] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
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
        </div>
    );
}

export default LogHours;