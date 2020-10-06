import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import { ItemListProvider } from './contexts/ItemListContext'
import { ItemProvider } from './contexts/ItemContext'
import App from './components/App/App'
import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <ItemListProvider>
      <ItemProvider>
        <App />
      </ItemProvider>
    </ItemListProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

serviceWorker.unregister()
