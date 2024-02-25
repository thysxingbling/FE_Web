import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom';
import './index.css'
import Siderbar from './components/layouts/siderbar.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      
       <BrowserRouter><Siderbar/></BrowserRouter>
        
     

  </React.StrictMode>,
)
