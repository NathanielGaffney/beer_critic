import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import { ItemProvider } from './contexts/ItemContext'
import App from './components/App/App'
import './index.css'

ReactDOM.render(
  <BrowserRouter>
      <ItemProvider>
        <App />
      </ItemProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

serviceWorker.unregister()
