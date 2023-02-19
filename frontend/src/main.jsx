import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './main.css'

import authConfig from '../auth-config.json';

//import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Auth0Provider
      domain={authConfig.Domain}
      clientId={authConfig.ClientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
)
