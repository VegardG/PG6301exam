import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Welcome to the hour logger</h1>
            <p>Press the button to go to login page:</p>
            <Link to="/login">
                <button>Login</button>
            </Link>
        </div>
    );
}

export default Home;