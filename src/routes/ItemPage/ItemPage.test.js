import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import ItemPage from './ItemPage';

it('renders without crashing', () => {

  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><ItemPage /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
})