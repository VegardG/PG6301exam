import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App component', () => {
    test('renders Home component on default route', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        const homeTitle = screen.getByRole('heading', { name: /welcome to the hour logger/i });
        expect(homeTitle).toBeInTheDocument();
    });

    test('renders Login component on /login route', () => {
        render(
            <BrowserRouter initialEntries={['/login']}>
                <App />
            </BrowserRouter>
        );

        const loginTitle = screen.getByRole('heading', { name: /login/i });
        expect(loginTitle).toBeInTheDocument();
    });

    test('renders ManagerDashboard component on /dashboard route for manager user', () => {
        localStorage.setItem('token', 'valid.jwt.token.encoded');

        render(
            <BrowserRouter initialEntries={['/dashboard']}>
                <App />
            </BrowserRouter>
        );

        const dashboardTitle = screen.getByRole('heading', { name: /employee list/i });
        expect(dashboardTitle).toBeInTheDocument();

        localStorage.removeItem('token');
    });

    test('renders EmployeeDashboard component on /dashboard route for employee user', () => {
        localStorage.setItem('token', 'valid.jwt.token.encoded');

        render(
            <BrowserRouter initialEntries={['/dashboard']}>
                <App />
            </BrowserRouter>
        );

        const hoursLoggedTitle = screen.getByRole('heading', { name: /log hours/i });
        expect(hoursLoggedTitle).toBeInTheDocument();

        localStorage.removeItem('token');
    });

    test('redirects to /login route for unauthenticated user on /dashboard route', () => {
        render(
            <BrowserRouter initialEntries={['/dashboard']}>
                <App />
            </BrowserRouter>
        );

        const loginTitle = screen.getByRole('heading', { name: /login/i });
        expect(loginTitle).toBeInTheDocument();
    });

    test('redirects to Home component for non-existing routes', () => {
        render(
            <BrowserRouter initialEntries={['/non-existing-route']}>
                <App />
            </BrowserRouter>
        );

        const homeTitle = screen.getByRole('heading', { name: /welcome to the hour logger/i });
        expect(homeTitle).toBeInTheDocument();
    });
});