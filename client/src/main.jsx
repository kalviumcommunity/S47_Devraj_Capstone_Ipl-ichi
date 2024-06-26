import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Auth0Provider
    domain="dev-3el8z70bpsdneaco.us.auth0.com"
    clientId="T2iTgEBsocZeTHKB5oJfS3A9dqiRdmo1"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
    </Auth0Provider>
  // </React.StrictMode>,
)
