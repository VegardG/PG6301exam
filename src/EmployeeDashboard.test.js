import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeDashboard from './EmployeeDashboard';

test('renders the log hours form', () => {
    render(<EmployeeDashboard />);
    const activityLabel = screen.getByText('Activity:');
    const hoursLabel = screen.getByText('Hours');
    const submitButton = screen.getByText('Submit');
    expect(activityLabel).toBeInTheDocument();
    expect(hoursLabel).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
});

test('updates total hours on successful form submission', async () => {
    render(<EmployeeDashboard />);
    const initialTotalHours = parseInt(screen.getByText(/Total hours logged:/).textContent.split(' ')[3]);
    const activitySelect = screen.getByLabelText('Activity:');
    const hoursInput = screen.getByLabelText('Hours');
    const submitButton = screen.getByText('Submit');
    const activity = 'Task A';
    const hours = '5';
    fireEvent.change(activitySelect, { target: { value: activity } });
    fireEvent.change(hoursInput, { target: { value: hours } });
    fireEvent.click(submitButton);
    await screen.findByText(`Total hours logged: ${initialTotalHours + parseInt(hours)}`);
});