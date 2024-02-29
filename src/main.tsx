import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import Siderbar from './components/layouts/siderbar/siderbar.tsx'


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
   
    <BrowserRouter><Siderbar/></BrowserRouter>
  </React.StrictMode>,
)
