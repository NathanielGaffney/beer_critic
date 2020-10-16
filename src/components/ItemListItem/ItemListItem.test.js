import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import ItemListItem from './ItemListItem';

it('renders without crashing', () => {

  const div = document.createElement('div');

  const item = {
      id: 1,
  }

  ReactDOM.render(<BrowserRouter><ItemListItem item={item}/></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
})