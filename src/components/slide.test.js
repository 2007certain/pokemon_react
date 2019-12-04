import React from 'react';
import ReactDOM from 'react-dom';
import Slide from './slide';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Slide data={{ name: '', id: 0, image: '' }} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
