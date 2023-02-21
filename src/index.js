import React from 'react';
import { createRoot } from 'react-dom/client';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//import ManagerLogin from './manager';
//import EmployeeLogin from './employee';
//import ManagerDashboard from './managerdashboard';
//import EmployeeDashboard from './EmployeeDashboard';
import reportWebVitals from "./reportWebVitals";
//import Login from './login'
import App from "./App";
//import Home from "./Homepage";



createRoot(document.getElementById('root')).render(

    <React.StrictMode>
        <App />
    </React.StrictMode>,
//document.getElementById('root')
);
    /*<Router>
            <App />
        <Routes>
                <Route path='manager' component={ManagerLogin} />
                <Route path='employee' component={EmployeeLogin} />
                <Route path='ManagerDashboard' component={ManagerDashboard} />
        </Routes>

    </Router>,
);*/

/*const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

  </React.StrictMode>
);*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
