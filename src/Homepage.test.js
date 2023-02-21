import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import Home from './Homepage';

describe('<Home />', () => {
    it('should render a welcome message and a login button', () => {
        const wrapper = shallow(<Home />);
        const welcomeMessage = wrapper.find('h1');
        expect(welcomeMessage.text()).toBe('Welcome to the hour logger');

        const loginButton = wrapper.find(Link).find('button');
        expect(loginButton.text()).toBe('Login');
        expect(loginButton.prop('to')).toBe('/login');
    });
});