import React from 'react';
import { mount, shallow } from 'enzyme';
import App from './App';

describe('App component', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
});
