import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Siderbar from './components/layouts/siderbar.tsx'
import Search from './components/layouts/search.tsx'
import Router from './routers/Router.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Siderbar></Siderbar> */}
    {/* <Search></Search> */}
    <Router/>
  </React.StrictMode>,
)
