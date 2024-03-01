import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import Component from './components/layouts/components/components.tsx'


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
   
    <BrowserRouter><Component/></BrowserRouter>
  </React.StrictMode>,
)
