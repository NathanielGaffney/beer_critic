import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import NewItemPage from './NewItemPage';

it('renders without crashing', () => {

  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><NewItemPage /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
})