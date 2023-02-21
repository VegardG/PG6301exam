import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {BrowserRouter as Router} from "react-router-dom";
//import App from "./App";
import Login from "./login";
import App from "./App";


test('renders login page', async () => {
  render(
      <Router>
        <Login />
      </Router>,
  );
  const headingElement = screen.getByText(/Login/i);
  expect(headingElement).toBeInTheDocument();
});