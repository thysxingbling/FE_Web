import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { BrowserRouter  } from 'react-router-dom'
import Component from './components/layouts/components/components'
import Login from './pages/Login/Login'
import Router from './routers/Router'







ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <BrowserRouter>
            <Router/>
      </BrowserRouter>
  </React.StrictMode>,
)
